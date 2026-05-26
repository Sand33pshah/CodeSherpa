import { useState } from "react";
import API from "../services/api";


function ChatPanel({ activeRepo }) {

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  //Send question to backend
  const handleAsk = async () => {

    if (!query.trim()) return;

    //user message
    const userMessage = {
      role: "user",
      content: query
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    try {
      setLoading(true);
      setQuery("");

      const result = await API.post(
        `/chat?query=${query}&repo_name=${activeRepo}`
      );

      //AI Response
      const aiMessage = {
        role: "assistant",
        content: result.data.response
      };

      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);

      // setQuery("");

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

      {/* Chat Messages */}
      <div className="flex-1 bg-slate-800 rounded-xl p-4 overflow-auto space-y-4">
        {messages.length === 0 && (
          <p className="text-slate-400">Ask question about your codebase...</p>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-[80%] ${message.role === "user" ? "bg-orange-500 ml-auto text-white" : "bg-slate-700 text-slate-200"
              }`}>
            {message.content}
          </div>
        ))}
        {loading && (
          <p className="text-slate-400">Thinking...</p>
        )}
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