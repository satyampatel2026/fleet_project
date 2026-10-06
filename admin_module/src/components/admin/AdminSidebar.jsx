import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Handshake} from "lucide-react"
import { FiHome,FiUsers,FiLayers,FiShield,FiTruck,FiAward,FiChevronRight,FiChevronDown,FiX} from "react-icons/fi";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FiHome },
  { to: "/admin/adminuser", label: "User Management", icon: FiUsers },
  { to: "/admin/department", label: "Department", icon: FiLayers },
  { to: "/admin/roles", label: "Roles", icon: FiShield },
  { to: "/admin/partnerspage", label: "Partners Management", icon: Handshake },
  { to: "/admin/kycpage", label: "Partners Kyc", icon: FiShield },
];

export default function AdminSidebar({ open, onClose }) {
  const [openMenus, setOpenMenus] = useState({});

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30">
        <SidebarContent
          openMenus={openMenus}
          setOpenMenus={setOpenMenus}
          onClose={onClose}
        />
      </div>

      {/* Mobile */}
      <AnimatePresence mode="wait">
  {open && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-[70] w-72 lg:hidden"
      >
        <SidebarContent
          openMenus={openMenus}
          setOpenMenus={setOpenMenus}
          onClose={onClose}
        />
      </motion.div>
    </>
  )}
</AnimatePresence>
    </>
  );
}

function SidebarContent({ openMenus, setOpenMenus, onClose }) {
  return (
    <aside className="flex flex-col h-full w-72 glass border-r border-slate-200/50 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <FiTruck size={22} color="white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Fleetrova
              </h3>
              <FiAward className="w-5 h-5 text-yellow-500" />
              <FiChevronRight className="w-4 h-4 text-brand-600" />
            </div>

            <p className="text-xs text-slate-500">Enterprise Admin</p>
          </div>
        </div>

       <button onClick={onClose} className="block lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><FiX className="w-5 h-5" />
</button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() =>
                  setOpenMenus({
                    ...openMenus,
                    [item.label]: !openMenus[item.label],
                  })
                }
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-[18px] h-[18px]" />
                  {item.label}
                </div>

                {openMenus[item.label] ? (
                  <FiChevronDown />
                ) : (
                  <FiChevronRight />
                )}
              </button>

              {openMenus[item.label] &&
                item.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    onClick={onClose}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 hover:translate-x-2"
                  >
                    {child.label}
                  </NavLink>
                ))}
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 hover:translate-x-2"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-yellow-400"></span>
                  )}

                  <item.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          )
        ))}
      </nav>
    </aside>
  );
}