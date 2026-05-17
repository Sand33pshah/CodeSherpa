from app.services.embedder import generate_embedding
from app.services.vector_store import collection

# Retrieve relevant chunks for a query


def retrieve_relevant_chunks(query, top_k=3):

    # convert user query into embedding
    query_embedding = generate_embedding(query)

    # search similar vectors in ChromaDB
    results = collection.query(

        query_embeddings=[query_embedding],

        n_results=top_k
    )

    return results
