function ChatPanel() {
  return (
    <div className="bg-slate-900 roundex-2xl p-4 border border-slate-800 min-h-[400px]">
      <h2 className="text-lg font-semibold mb-4">
        AI Chat
      </h2>
      <div className="bg-slate-800 rounded-xl p-4 text-slate-300">
        Ask question about your codebase...
      </div>
    </div>
  );
}

export default ChatPanel;