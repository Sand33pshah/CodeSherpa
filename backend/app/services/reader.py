import os

# read content of supported files


def read_file_content(file_path):

    try:
        # Open file in read mode with UTF-8 encoding
        with open(file_path, "r", encoding="utf-8") as file:

            # read full file content
            content = file.read()

            return content
    except Exception as e:

        # return error if file connot be read
        return f"Error reading file: {str(e)}"


# Read all scanned repository files
def process_repository_files(scanned_files):

    processed_files = []

    # Loop through all scanned files
    for file_path in scanned_files:

        # read file content
        content = read_file_content(file_path)

        # store file data
        processed_files.append({
            "file_path": file_path,
            "content": content
        })
    return processed_files
