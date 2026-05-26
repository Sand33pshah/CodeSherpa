import { useState } from "react";
import API from "../services/api";


function ChatPanel() {

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  //Send question to backend
  const handleAsk = async () => {

    if (!query.trim()) return;

    try {
      setLoading(true);

      const result = await API.post(
        `/chat?query=${query}`
      );

      setResponse(result.data.response);

    } catch (error) {

      console.error(error);

    } finally {
      setLoading(false);
    }

  };



  return (
    <div className="bg-slate-900 roundex-2xl p-4 border border-slate-800 min-h-[400px] flex flex-col">

      <h2 className="text-lg font-semibold mb-4">
        AI Chat
      </h2>
      {/*AI Response */}
      <div className="flex-1 bg-slate-800 rounded-xl p-4 text-slate-300 overflow-auto">
        {loading ?
          "Thinking..." : response || "Ask questions about your codebase..."

        }
      </div>
      {/* Input Area */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Ask about the repository..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 outline-none"
        />
        <button onClick={handleAsk} className="bg-orange-500 hover:bg-orange-600 px-4 rounded-xl font-medium">Ask</button>
      </div>
    </div>
  );
}

export default ChatPanel;