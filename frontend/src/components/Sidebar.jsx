import { useState } from "react";
import API from "../services/api"



function Sidebar({ repos, setRepos, activeRepo, setActiveRepo }) {

  const [loading, setLoading] = useState(false);
  const [repoData, setRepoData] = useState(null);

  //upload repository ZIP
  const handleUpload = async (event) => {

    const file = event.target.files[0];


    if (!file) return;

    // setActiveRepo(file.name.replace(".zip", ""))
    const cleanedRepoName = file.name.replace(".zip", "");

    setActiveRepo(cleanedRepoName);

    setRepos((prev) => [
      ...prev,
      cleanedRepoName
    ]);

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const response = await API.post("/upload", formData);

      console.log(response.data);

      setRepoData(response.data);

    } catch (error) {

      console.error(error);
      alert("Upload Failed.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
      <h2 className="text-lg font-semibold mb-4">
        Repository
      </h2>
      <label className="block">
        <input type="file" className="hidden" accept=".zip" onChange={handleUpload} />
        <div className="w-full bg-orange-500 hover:bg-orange-600 transition rounded-xl py-2 font-medium text-center cursor-pointer">
          {loading ? "Processing..." : "Upload ZIP"}
        </div>
      </label>
      {repoData && (
        <div className="mt-4 bg-slate-800 rounded-xl p-3 text-sm">
          <p className="text-green-400 font-medium">
            Repository Processed
          </p>

          <p className="text-slate-300 mt-2">
            Total Chunks: {repoData.total_chunks}
          </p>
        </div>
      )}
      <div className="mt-4 space-y-2">
        {repos.map((repo, index) => (
          <button
            key={index}
            onClick={() => setActiveRepo(repo)}
            className={`w-full rounded-xl p-2 text-left transition ${activeRepo === repo ? "bg-orange-500 text-white" : "bg-slate-800 hover:bg-slate-700"}`}
          >
            {repo}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;