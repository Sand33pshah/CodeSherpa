import ollama

from app.services.retriver import retrieve_relevant_chunks

# Generate AI answer using retrieved context


def generate_rag_response(query):

    # Retrieve relevant chunks
    results = retrieve_relevant_chunks(query)

    # Extract retrieved documents
    retrieved_docs = results["documents"][0]

    # combine chunks into context
    context = "\n\n".join(retrieved_docs)

    # Create prompt
    prompt = f"""
  You are an AI codebase assistant.

  Answer the question using the repository context below.

  Repository Context:
  {context}

  User Question:
  {query}
  """

    # Send prompt to local Ollama model

    response = ollama.chat(
        model="mistral",

        messages=[{
            "role": "user",
            "content": prompt
        }]
    )

    return response["message"]["content"]
