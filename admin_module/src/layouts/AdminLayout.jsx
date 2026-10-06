import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../components/admin/AdminSidebar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar
  open={sidebarOpen}
  onClose={() => {
    console.log("onClose called");
    setSidebarOpen(false);
  }}
/>
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setSidebarOpen(true)} dark={dark} onToggleTheme={() => setDark(!dark)} />
        <main className="flex-1 pt-20 p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}