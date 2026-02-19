"""
Build embeddings and FAISS index from a CSV dataset.
Supports local sentence-transformers embeddings or OpenAI embeddings.
Outputs:
- faiss_index.bin (index)
- embeddings.npy (optional)
- metadata.json (list of records)

Usage:
python embed_and_index.py --csv path/to/survey.csv --output_dir ai_assistant/index --embedder local

"""

import argparse
import os
import json
from pathlib import Path
import numpy as np
import pandas as pd
from tqdm import tqdm

# Choose embedding implementation
try:
    from sentence_transformers import SentenceTransformer
except Exception:
    SentenceTransformer = None

# OpenAI embeddings optional
try:
    import openai
except Exception:
    openai = None

import faiss


def load_csv(csv_path: str) -> pd.DataFrame:
    df = pd.read_csv(csv_path, low_memory=False)
    return df


def row_to_text(row: pd.Series) -> str:
    # Concatenate useful columns into a single text chunk.
    # Adjust columns to taste depending on CSV structure.
    items = []
    for col, val in row.items():
        if pd.isna(val):
            continue
        items.append(f"{col}: {val}")
    return "\n".join(items)


def embed_texts_openai(texts, model="text-embedding-3-small", api_key=None):
    if openai is None:
        raise RuntimeError("openai library not installed")
    if api_key:
        openai.api_key = api_key
    embeddings = []
    for t in tqdm(texts, desc="OpenAI embedding"):
        resp = openai.Embedding.create(input=t, model=model)
        embeddings.append(resp["data"][0]["embedding"])
    return np.array(embeddings, dtype=np.float32)


def embed_texts_local(texts, model_name="all-MiniLM-L6-v2"):
    if SentenceTransformer is None:
        raise RuntimeError("sentence-transformers not available")
    model = SentenceTransformer(model_name)
    embeddings = model.encode(texts, show_progress_bar=True, convert_to_numpy=True)
    return embeddings.astype(np.float32)


def build_faiss_index(embeddings: np.ndarray, output_dir: Path):
    d = embeddings.shape[1]
    index = faiss.IndexFlatIP(d)  # cosine via normalized vectors, using inner product
    # normalize for cosine similarity
    faiss.normalize_L2(embeddings)
    index.add(embeddings)
    faiss.write_index(index, str(output_dir / "faiss_index.bin"))


def save_metadata(metadata, output_dir: Path):
    with open(output_dir / "metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--csv", required=True)
    parser.add_argument("--output_dir", default="ai_assistant/index")
    parser.add_argument("--embedder", choices=["local", "openai"], default="local")
    parser.add_argument("--openai_model", default="text-embedding-3-small")
    parser.add_argument("--local_model", default="all-MiniLM-L6-v2")
    parser.add_argument("--openai_api_key", default=None)
    args = parser.parse_args()

    csv_path = Path(args.csv)
    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    df = load_csv(str(csv_path))
    texts = []
    metadata = []
    for idx, row in df.iterrows():
        text = row_to_text(row)
        if not text.strip():
            continue
        texts.append(text)
        # Store the original concatenated text in metadata so retrieval can show it
        metadata.append({"row": int(idx), "source": str(csv_path), "text": text})

    print(f"Loaded {len(texts)} documents from CSV")

    if args.embedder == "openai":
        if args.openai_api_key is None:
            args.openai_api_key = os.environ.get("OPENAI_API_KEY")
        embeddings = embed_texts_openai(texts, model=args.openai_model, api_key=args.openai_api_key)
    else:
        embeddings = embed_texts_local(texts, model_name=args.local_model)

    # Save embeddings (optional)
    np.save(out_dir / "embeddings.npy", embeddings)
    save_metadata(metadata, out_dir)
    build_faiss_index(embeddings, out_dir)

    print("Index built and saved to", out_dir)


if __name__ == "__main__":
    main()
