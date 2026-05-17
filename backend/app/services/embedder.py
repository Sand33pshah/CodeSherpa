from sentence_transformers import SentenceTransformer

# load lightweight embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Generate embedding vector for text


def generate_embedding(text):

    # convert text into vector
    embedding = model.encode(text)

    return embedding.tolist()
