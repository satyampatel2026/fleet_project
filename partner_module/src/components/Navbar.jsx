import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutPartner } from "../services/partnerService";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Plus,LogOut
} from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logoutPartner();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error.message || "Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200">
      <div className="h-full flex items-center justify-between px-4 md:px-5">

        {/* LEFT */}
        <div className="flex items-center min-w-0">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="lg:hidden w-8 h-8 mr-2 rounded-md hover:bg-slate-100 flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1">
          {/* SEARCH */}
          <div className="hidden md:flex items-center w-48 h-8 px-2.5 mr-2 bg-slate-50 border border-slate-200 rounded-md">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 outline-none"
            />
          </div>

          {/* MESSAGE */}
          <button
            className="w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center"
            aria-label="Messages"
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
          </button>

          {/* NOTIFICATION */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-10 w-64 bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden">
                <div className="px-3 py-2.5 border-b border-slate-100 flex justify-between">
                  <span className="text-xs font-semibold text-slate-800">
                    Notifications
                  </span>
                  <span className="text-[10px] text-blue-600">3 new</span>
                </div>

                {[
                  {
                    title: "New job assigned",
                    detail: "Job #JOB-2042 • 2 min ago",
                    color: "bg-blue-500",
                  },
                  {
                    title: "Payment received",
                    detail: "₹12,500 from Rahul S.",
                    color: "bg-emerald-500",
                  },
                  {
                    title: "Leave request",
                    detail: "Amit Verma • 1 hr ago",
                    color: "bg-amber-500",
                  },
                ].map((notification, index) => (
                  <div
                    key={index}
                    className="flex gap-2.5 px-3 py-2.5 hover:bg-slate-50 border-b border-slate-100 last:border-0"
                  >
                    <span
                      className={`w-1.5 h-1.5 mt-1.5 rounded-full ${notification.color}`}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-slate-700 truncate">
                        {notification.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {notification.detail}
                      </p>
                    </div>
                  </div>
                ))}

                <button className="w-full py-2 text-[11px] text-blue-600 hover:bg-blue-50">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* NEW JOB */}
          <button
            className="hidden sm:flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium px-2.5 h-8 rounded-md ml-1"
          >
            <Plus className="w-3.5 h-3.5" />
            New Job
          </button>

          {/* DIVIDER */}
          <div className="hidden md:block h-5 w-px bg-slate-200 mx-2" />

          {/* PROFILE */}
<div className="relative">
  <button
    type="button"
    onClick={() => setProfileOpen(!profileOpen)}
    className="flex items-center gap-1.5 px-1 py-1 rounded-md hover:bg-slate-50"
  >
    <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white text-[9px] font-semibold">
      SM
    </div>

    <div className="hidden lg:block text-left">
      <p className="text-[11px] font-semibold text-slate-700 leading-none">
        Sharma Motors
      </p>
      <p className="text-[9px] text-slate-400 mt-1 leading-none">
        Fleet Partner
      </p>
    </div>

    <ChevronDown className="hidden md:block w-3 h-3 text-slate-400" />
  </button>

  {profileOpen && (
    <div className="absolute right-0 top-10 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        <LogOut className="w-4 h-4" />
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  )}
</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;