# split text into smaller chunks
def chunk_text(text, chunk_size=500):

    chunks = []

    # Loop through text in steps of chunk_size
    for i in range(0, len(text), chunk_size):

        # Extract chunk
        chunk = text[i:i + chunk_size]

        chunks.append(chunk)

    return chunks


# convert repository files into chunks
def chunk_repository(processed_files):

    all_chunks = []

    # Loop through processed files
    for file_data in processed_files:

        file_path = file_data["file_path"]
        content = file_data["content"]

        # split content into chunks
        chunks = chunk_text(content)

        # store chunks with metadata
        for index, chunk in enumerate(chunks):

            all_chunks.append({
                "file_path": file_path,
                "chunk_index": index,
                "chunk_content": chunk
            })
        return all_chunks
