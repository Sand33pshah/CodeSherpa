import { useState } from "react";
import API from "../services/api"



function Sidebar({ setActiveRepo }) {

  const [loading, setLoading] = useState(false);
  const [repoData, setRepoData] = useState(null);

  //upload repository ZIP
  const handleUpload = async (event) => {

    const file = event.target.files[0];


    if (!file) return;

    setActiveRepo(file.name.replace(".zip", ""))

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
    </div>
  );
}

export default Sidebar;