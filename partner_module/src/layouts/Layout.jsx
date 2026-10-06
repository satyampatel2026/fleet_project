import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";

const Layout = ({
  children,
  activePath,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePath={activePath}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* NAVBAR */}
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-5 lg:p-6">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;