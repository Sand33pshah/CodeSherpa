from fastapi import FastAPI, UploadFile, File
import os
import shutil
from app.services.scanner import extract_zip, scan_repository
from app.services.reader import process_repository_files
from app.services.chunker import chunk_repository
from app.services.vector_store import store_chunks
from app.services.retriver import retrieve_relevant_chunks

app = FastAPI()

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {"message": "AI Codebase Analyzer Running"}


@app.post("/upload")
async def upload_zip(file: UploadFile = File(...)):

    # save uploaded ZIP file
    zip_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(zip_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # create extraction folder name
    extract_folder = zip_path.replace(".zip", "")

    # Extract ZIP Contents
    extract_zip(zip_path, extract_folder)

    # scan extracted repository
    scanned_files = scan_repository(extract_folder)

    # read content of scanned files
    processed_files = process_repository_files(scanned_files)

    # Convert files into chunks
    chunks = chunk_repository(processed_files)

    # Store chunks inside vector database
    store_chunks(chunks)

    return {
        "message": "Repository embedded successfully",
        "total_chunks": len(chunks)
    }


@app.post("/chat")
async def chat(query: str):

    # Retrive relevant repository chunks
    results = retrieve_relevant_chunks(query)

    return {
        "query": query,
        "result": results
    }
