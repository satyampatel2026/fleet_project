import { useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, Wrench, Users, ClipboardList, UserRound,
  Package, Wallet, BarChart3, Settings, LogOut, ChevronRight,
} from "lucide-react";
import { logoutPartner } from "../services/partnerService"; 

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", enabled: true },
  { label: "Services", icon: Wrench, href: "/partner/services", enabled: false },  
  { label: "Employees", icon: Users, href: "/partner/employees", enabled: false }, 
  { label: "Job Cards", icon: ClipboardList, href: "/partner/jobs", enabled: false }, 
  { label: "Customers", icon: UserRound, href: "/partner/customers", enabled: false }, 
  { label: "Inventory", icon: Package, href: "/partner/inventory", enabled: false }, 
  { label: "Payments", icon: Wallet, href: "/partner/payments", enabled: false }, 
  { label: "Profile", icon: BarChart3, href: "/partner/kyc", enabled: true },  
  { label: "Settings", icon: Settings, href: "/partner/settings", enabled: false }, 
];

const Sidebar = ({ open, onClose, activePath = "/" }) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logoutPartner(); 
    } catch (error) {
      console.error("Logout error:", error);
    }
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-screen w-[272px] shrink-0
        bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300
        flex flex-col border-r border-slate-800/80
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 h-[72px] border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-[15px] tracking-tight">
              FleetPartner
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Workshop Suite
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-thumb]:bg-slate-700
          [&::-webkit-scrollbar-thumb]:rounded-full">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          {menuItems.map(({ label, icon: Icon, href, badge, enabled }) => {
            const active = activePath === href;
            
            // Agar page ready nahi hai, toh click karne par alert dega aur kahin nahi bhejega
            const handleClick = (e) => {
              if (!enabled) {
                e.preventDefault(); // Page change hone se rok dega
                alert(`"${label}" page is under development and will be available soon!`);
              }
            };

            return (
              <Link
                key={label}
                to={enabled ? href : "#"}
                onClick={handleClick}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200
                ${!enabled ? "opacity-50 cursor-not-allowed" : ""} 
                ${active
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                }`}
              >
                {active && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-blue-400" />
                )}
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-transform group-hover:scale-110
                  ${active ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}
                  strokeWidth={2}
                />
                <span className="flex-1 truncate">{label}</span>
                {badge && enabled && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md
                  ${active ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                    {badge}
                  </span>
                )}
                {active && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="border-t border-slate-800/80 p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-800/60 transition cursor-pointer">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                SM
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Sharma Motors
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                Partner Account
              </p>
            </div>
            <LogOut className="w-4 h-4 text-slate-500 hover:text-red-400 transition"
              onClick={handleLogout}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;