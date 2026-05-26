import chromadb
from app.services.embedder import generate_embedding


# create ChromaDB client
client = chromadb.PersistentClient(path="chroma_db")


# Retrieve relevant chunks for a query


def retrieve_relevant_chunks(query, repo_name, top_k=3):

    collection = client.get_or_create_collection(
        name=f"repository_{repo_name}"
    )

    # convert user query into embedding
    query_embedding = generate_embedding(query)

    # search similar vectors in ChromaDB
    results = collection.query(

        query_embeddings=[query_embedding],

        n_results=top_k
    )

    return results
