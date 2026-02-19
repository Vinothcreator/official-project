RAG Training + Query Scripts for Healthcare AI Assistant

Overview
- This folder provides scripts to build a retrieval-augmented knowledge base from a CSV dataset (e.g., `survey.csv`) and run a simple RAG query flow.
- Supports two embedding options:
  - Local embeddings via `sentence-transformers` (default)
  - OpenAI embeddings (if you set `USE_OPENAI_EMBEDDINGS=1` and export `OPENAI_API_KEY`)
- Retrieval index uses FAISS (CPU) and metadata is stored as JSON/NPY.
- Querying supports retrieving context and calling OpenAI ChatCompletion (optional) to generate a final answer.

Quick files
- `requirements.txt` : Python deps
- `embed_and_index.py` : Build embeddings and FAISS index from a CSV
- `query_bot.py` : Query the index and optionally call OpenAI to generate the reply
- `.env.example` : Example env vars

Quick start (copy dataset into this folder or pass path):

1) Create virtualenv and install dependencies

```bash
python -m venv .venv
.\.venv\Scripts\activate    # Windows
pip install -r ai_assistant/requirements.txt
```

2) Build embeddings + index (local embedding by default)

```bash
python ai_assistant/embed_and_index.py --csv "path/to/survey.csv" --output_dir "ai_assistant/index" --embedder local
```

To use OpenAI embeddings instead (requires `OPENAI_API_KEY`):

```bash
# set OPENAI_API_KEY in your environment
python ai_assistant/embed_and_index.py --csv "path/to/survey.csv" --output_dir "ai_assistant/index" --embedder openai
```

3) Query the index

```bash
python ai_assistant/query_bot.py --index_dir "ai_assistant/index" --k 5
```

To have the script call OpenAI to generate a final response, set `OPENAI_API_KEY` and run with `--use_openai_model`.

Notes & Security
- The scripts are minimal and designed to be run locally or on a machine you control.
- If using OpenAI, keep your `OPENAI_API_KEY` secret and do not commit it to source control.
- You can adapt prompt templates, chunking strategy, and models to your needs.

If you want, I can:
- Add support for Chroma or Milvus instead of FAISS
- Add a small evaluation harness (few-shot tests)
- Provide a Dockerfile to run this reproducibly
