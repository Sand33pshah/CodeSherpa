import zipfile
import os


# Function to extract uploaded ZIP File
def extract_zip(zip_path, extract_to):

    # Open ZIP file in read mode
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        # Extract all the content into the target Folder
        zip_ref.extractall(extract_to)

    return extract_to


# Supported source-code file extensions
SUPPORTED_EXTENSIONS = [
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".java",
    ".cpp",
    ".md"
]

# Folders we do NOT want to scan
IGNORED_FOLDERS = [
    "node_modules",
    ".git",
    "__pycache__",
    "venv"
]

# Function to recursively scan project files


def scan_repository(repo_path):

    valid_files = []

    # walk through all folders/files
    for root, dirs, files in os.walk(repo_path):

        # remove ignored folders from traversal
        dirs[:] = [d for d in dirs if d not in IGNORED_FOLDERS]

        # loop through files:
        for file in files:

            # get full file path
            file_path = os.path.join(root, file)

            # check if file extension is supported
            if file.endswith(tuple(SUPPORTED_EXTENSIONS)):

                valid_files.append(file_path)

    return valid_files
