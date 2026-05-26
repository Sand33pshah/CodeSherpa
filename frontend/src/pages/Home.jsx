import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ChatPanel from "../components/ChatPanel"
import { useState } from "react";




function Home() {
  const [activeRepo, setActiveRepo] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 md:p-6">

        <div className="lg:col-span-3">
          <Sidebar setActiveRepo={setActiveRepo} />
        </div>

        <div className="lg:col-span-9">

          <ChatPanel activeRepo={activeRepo} />

        </div>
      </div>

    </div>
  );
}

export default Home;