function Navbar() {
  return (
    <div className="border-b border-slate-800 px-4 md:px-8 py-4 flex-col md:flex-row md:justify-between md:item-center gap-2">
      <h1 className="text-2xl font-bold">
        CodeSherpa🏔️
      </h1>
      <p className="text-slate-400 text-sm">
        navigate unfamiliar codebases with AI
      </p>
    </div>
  );
}

export default Navbar;