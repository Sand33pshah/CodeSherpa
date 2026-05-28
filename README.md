# 🏔️ CodeSherpa — AI Codebase Analyzer

> Chat with any codebase using AI.

CodeSherpa is a full-stack AI-powered repository analysis platform that uses **RAG**, **Vector Embeddings**, and **Local LLMs** to understand repositories semantically.

Built with:

* FastAPI
* React + TailwindCSS
* Ollama + Mistral
* ChromaDB

---

# ✨ Features

* Upload GitHub repositories or ZIP files
* AI-powered codebase chat
* Semantic code search using vector embeddings
* Multi-repository workspace
* Repository-aware conversational UI
* Fully local AI inference using Ollama

---

# 🧠 Workflow

```bash id="b7v2m4"
Repository Upload
    ↓
Code Chunking
    ↓
Embedding Generation
    ↓
ChromaDB Vector Storage
    ↓
Semantic Retrieval
    ↓
LLM Response Generation
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* TailwindCSS

## Backend

* FastAPI
* Python

## AI / RAG

* Ollama
* Mistral
* Sentence Transformers
* ChromaDB

---

# 🚀 Run Locally

## Backend

```bash id="m2v8q1"
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

## Frontend

```bash id="p4m7x2"
cd frontend

npm install

npm run dev
```

---

# ✅ Current MVP

* Multi-repository AI chat
* Repository context switching
* Semantic retrieval pipeline
* Conversational UI
* Local LLM integration

---

# 🚧 Upcoming Features

* Markdown rendering
* Syntax highlighted code blocks
* Streaming responses
* Chat persistence
* Deployment
