import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShieldCheck } from "lucide-react";

const links = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Documentation", href: "/docs" },
  { label: "Support", href: "/support" },
];

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

          {/* Left - Copyright */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-700">
                FleetPartner
              </span>
              . All rights reserved.
            </span>

            <span className="hidden sm:inline text-slate-300">
              |
            </span>

            <span className="hidden sm:flex items-center gap-1">
              Crafted with
              <Heart
                className="w-3 h-3 text-red-500 fill-red-500"
              />
              for workshops
            </span>
          </div>

          {/* Center - Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right - System Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />

            <span className="text-xs font-medium text-emerald-700">
              All systems operational
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;