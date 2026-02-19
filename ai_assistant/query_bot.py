"""
Query the FAISS index and return top-k documents. Optionally call OpenAI ChatCompletion
to produce a final answer using retrieved context.

Usage:
python query_bot.py --index_dir ai_assistant/index --k 5

If you want the script to call OpenAI to generate the reply, set OPENAI_API_KEY and use --use_openai_model
"""

import argparse
import json
from pathlib import Path
import numpy as np
import os
import pandas as pd

try:
    import openai
except Exception:
    openai = None

from sentence_transformers import SentenceTransformer
import faiss


def load_index(index_dir: Path):
    idx_path = index_dir / "faiss_index.bin"
    if not idx_path.exists():
        raise FileNotFoundError(f"Index not found at {idx_path}")
    index = faiss.read_index(str(idx_path))
    metadata = json.loads((index_dir / "metadata.json").read_text())
    embeddings = None
    emb_path = index_dir / "embeddings.npy"
    if emb_path.exists():
        embeddings = np.load(emb_path)
    # Build a cache of CSV DataFrames for any source referenced in metadata
    csv_cache = {}
    for md in metadata:
        if isinstance(md, dict) and "source" in md:
            src = md["source"]
            if src and src not in csv_cache:
                try:
                    df = pd.read_csv(src, low_memory=False)
                    csv_cache[src] = df
                except Exception:
                    csv_cache[src] = None

    return index, metadata, embeddings, csv_cache


def embed_query_local(query: str, model_name="all-MiniLM-L6-v2"):
    model = SentenceTransformer(model_name)
    emb = model.encode([query], convert_to_numpy=True)
    emb = emb.astype('float32')
    faiss.normalize_L2(emb)
    return emb


def embed_query_openai(query: str, model="text-embedding-3-small", api_key=None):
    if openai is None:
        raise RuntimeError("openai library not installed")
    if api_key:
        openai.api_key = api_key
    resp = openai.Embedding.create(input=query, model=model)
    emb = np.array(resp["data"][0]["embedding"], dtype=np.float32)[None, :]
    faiss.normalize_L2(emb)
    return emb


def retrieve(index, query_emb, k=5):
    D, I = index.search(query_emb, k)
    return I[0], D[0]


def build_prompt(retrieved_texts, user_query):
    context = "\n\n---\n\n".join(retrieved_texts)
    prompt = f"You are a helpful healthcare assistant. Use the context below to answer the question. If the context does not contain the answer, say you don't know and suggest next steps.\n\nContext:\n{context}\n\nQuestion: {user_query}\n\nAnswer:" 
    return prompt


def call_openai_chat(prompt: str, model="gpt-4o", api_key=None, max_tokens=400):
    if openai is None:
        raise RuntimeError("openai library not installed")
    if api_key:
        openai.api_key = api_key
    resp = openai.ChatCompletion.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=0.1,
    )
    return resp["choices"][0]["message"]["content"].strip()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--index_dir", default="ai_assistant/index")
    parser.add_argument("--k", type=int, default=5)
    parser.add_argument("--embedder", choices=["local", "openai"], default="local")
    parser.add_argument("--openai_api_key", default=None)
    parser.add_argument("--openai_model", default="gpt-4o")
    parser.add_argument("--use_openai_model", action="store_true", help="Use OpenAI ChatCompletion to generate the final reply")
    args = parser.parse_args()

    index_dir = Path(args.index_dir)
    index, metadata, embeddings, csv_cache = load_index(index_dir)

    while True:
        query = input("\nYour question (or 'exit'): ")
        if not query or query.lower().strip() in ("exit", "quit"):
            break

        if args.embedder == "openai":
            api_key = args.openai_api_key or os.environ.get("OPENAI_API_KEY")
            query_emb = embed_query_openai(query, api_key=api_key)
        else:
            query_emb = embed_query_local(query)

        I, D = retrieve(index, query_emb, k=args.k)

        retrieved_texts = []
        for idx in I:
            md = metadata[idx]
            # Prefer the stored original text when available
            if isinstance(md, dict) and "text" in md:
                retrieved_texts.append(md["text"])
            else:
                # Try to load the CSV row content if possible
                if isinstance(md, dict) and md.get("source") and md.get("row") is not None:
                    src = md.get("source")
                    rownum = int(md.get("row"))
                    df = csv_cache.get(src)
                    if df is not None and 0 <= rownum < len(df):
                        row_dict = df.iloc[rownum].to_dict()
                        # convert row dict into text
                        parts = [f"{k}: {v}" for k, v in row_dict.items()]
                        retrieved_texts.append("\n".join(parts))
                        continue
                retrieved_texts.append(json.dumps(md))

        print("\nTop results (idx, score, source, row):")
        for i, score in zip(I, D):
            if i < len(metadata):
                md = metadata[i]
                src = md.get("source") if isinstance(md, dict) else None
                rownum = md.get("row") if isinstance(md, dict) else None
                snippet = None
                if isinstance(md, dict):
                    if md.get("text"):
                        snippet = (md.get("text")[:200] + "...")
                    else:
                        df = csv_cache.get(src)
                        if df is not None and rownum is not None and 0 <= int(rownum) < len(df):
                            row_dict = df.iloc[int(rownum)].to_dict()
                            snippet = ("; ".join([f"{k}: {v}" for k, v in row_dict.items()])[:200] + "...")
                if snippet is None:
                    snippet = str(md)
                print(i, f"{score:.4f}", "->", src, "row:", rownum, "snippet:", snippet)
            else:
                print(i, score, "->", "-")

        prompt = build_prompt(retrieved_texts, query)

        if args.use_openai_model:
            api_key = args.openai_api_key or os.environ.get("OPENAI_API_KEY")
            answer = call_openai_chat(prompt, model=args.openai_model, api_key=api_key)
            print("\nAI Answer:\n", answer)
        else:
            print("\nRetrieved context:\n")
            for t in retrieved_texts:
                print(t)
            print("\nYou can enable OpenAI model to generate polished answers by setting OPENAI_API_KEY and running with --use_openai_model")


if __name__ == "__main__":
    main()
