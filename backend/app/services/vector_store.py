import chromadb
from app.services.embedder import generate_embedding

# create ChromaDB client
client = chromadb.PersistentClient(path="chroma_db")

# Store chunk embeddings


def store_chunks(chunks, repo_name):

    # create/get seperate collections for each repo
    collection = client.get_or_create_collection(
        name=f"repository_{repo_name}"
    )

    for index, chunk in enumerate(chunks):

        # Generate embedding vector
        embedding = generate_embedding(
            chunk["chunk_content"]
        )

        collection.add(
            ids=[str(index)],

            embeddings=[embedding],

            documents=[chunk["chunk_content"]],

            metadatas=[{
                "file_path": chunk["file_path"]
            }]
        )
