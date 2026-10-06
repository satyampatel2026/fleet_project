import React from "react";
import Layout from "../layouts/Layout";
import {
  Wrench, Users, CheckCircle2, IndianRupee, TrendingUp, Plus,
  ArrowRight, Star, Clock, Package,
} from "lucide-react";

const stats = [
  { title: "Active Services", value: "18", icon: Wrench, trend: "+3 this month", color: "blue" },
  { title: "Total Employees", value: "24", icon: Users, trend: "+2 new hires", color: "emerald" },
  { title: "Jobs Completed", value: "342", icon: CheckCircle2, trend: "+28 this week", color: "violet" },
  { title: "Revenue", value: "₹4.86L", icon: IndianRupee, trend: "+18% vs last month", color: "amber" },
];

const jobs = [
  { id: "#JOB-2041", vehicle: "MH12 AB 1234", service: "Engine Oil Change", emp: "Suresh Patil", status: "Completed", tone: "emerald" },
  { id: "#JOB-2040", vehicle: "MP04 CD 5678", service: "Brake Pad Replacement", emp: "Amit Verma", status: "In Progress", tone: "blue" },
  { id: "#JOB-2039", vehicle: "MP09 EF 9012", service: "AC Repair", emp: "Rajesh Kumar", status: "Pending", tone: "amber" },
  { id: "#JOB-2038", vehicle: "MH14 GH 3456", service: "Tire Rotation", emp: "Vikram Singh", status: "Completed", tone: "emerald" },
];

const quickActions = [
  { icon: Wrench, title: "Add Service", desc: "Create new workshop service", color: "blue" },
  { icon: Users, title: "Add Employee", desc: "Register a new team member", color: "emerald" },
  { icon: Package, title: "Inventory", desc: "Check stock & orders", color: "violet" },
  { icon: TrendingUp, title: "Reports", desc: "View performance analytics", color: "amber" },
];

const toneMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100", grad: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/25" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100", grad: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/25" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", ring: "ring-violet-100", grad: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/25" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100", grad: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/25" },
};

const Dashboard = () => {
  return (
    <Layout title=" dashboard" activePath="/dashboard">

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {stats.map((s) => {
          const t = toneMap[s.color];
          const Icon = s.icon;
          return (
            <div key={s.title} className="group bg-white rounded-2xl p-5 border border-slate-200/70 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{s.title}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{s.value}</h3>
                </div>
                <div className={`w-11 h-11 rounded-xl ${t.bg} ${t.text} flex items-center justify-center ring-4 ${t.ring} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" strokeWidth={2.2} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <p className="text-xs font-medium text-emerald-600">{s.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-5 mt-5">

        {/* RECENT JOBS */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/70 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900">Recent Service Jobs</h2>
              <p className="text-xs text-slate-500 mt-1">Latest workshop service requests</p>
            </div>
            <a href="/partner/jobs" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/70">
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3.5">Job ID</th>
                  <th className="px-5 py-3.5">Vehicle</th>
                  <th className="px-5 py-3.5">Service</th>
                  <th className="px-5 py-3.5">Assigned To</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((j) => {
                  const t = toneMap[j.tone];
                  return (
                    <tr key={j.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4 font-semibold text-slate-800">{j.id}</td>
                      <td className="px-5 py-4 text-slate-600 font-mono text-xs">{j.vehicle}</td>
                      <td className="px-5 py-4 text-slate-700">{j.service}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-full ${t.bg} ${t.text} flex items-center justify-center text-[10px] font-bold`}>
                            {j.emp.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="text-slate-700">{j.emp}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${t.bg} ${t.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
                          {j.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* EMPLOYEE OVERVIEW */}
        <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Employee Overview</h2>
            <p className="text-xs text-slate-500 mt-1">Team availability status</p>
          </div>

          <div className="p-5 space-y-5">
            {[
              { label: "Available", value: 14, pct: 58, color: "bg-emerald-500" },
              { label: "On Job", value: 7, pct: 29, color: "bg-blue-500" },
              { label: "On Leave", value: 3, pct: 13, color: "bg-rose-500" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">{b.label}</span>
                  <span className="text-sm font-bold text-slate-800">{b.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${b.color} rounded-full transition-all duration-700`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-semibold text-slate-800">Top Performers</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Suresh Patil", jobs: 42, initials: "SP", bg: "from-blue-500 to-indigo-600" },
                  { name: "Amit Verma", jobs: 38, initials: "AV", bg: "from-violet-500 to-purple-600" },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${p.bg} flex items-center justify-center text-white text-[11px] font-bold`}>
                        {p.initials}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{p.name}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      {p.jobs} jobs
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a href="/partner/employees" className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-sm font-semibold text-blue-600 transition">
              View All Employees <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900">Quick Actions</h2>
          <a href="/partner/shortcuts" className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition">
            Customize
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a) => {
            const t = toneMap[a.color];
            const Icon = a.icon;
            return (
              <div key={a.title} className="group bg-white border border-slate-200/70 rounded-2xl p-5 transition-all duration-300">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.grad} shadow-lg ${t.shadow} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <p className="font-semibold text-slate-800">{a.title}</p>
                <p className="text-xs text-slate-500 mt-1">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-600/20">
          <Clock className="w-6 h-6 mb-3 opacity-90" />
          <p className="text-xs font-medium opacity-80 uppercase tracking-wide">Avg. Service Time</p>
          <p className="text-2xl font-bold mt-1">2h 34m</p>
          <p className="text-xs opacity-80 mt-1">↓ 12% faster this month</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/70">
          <Package className="w-6 h-6 mb-3 text-violet-600" />
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Low Stock Items</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">7</p>
          <p className="text-xs font-semibold text-violet-600 mt-1">Restock recommended</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/70">
          <Star className="w-6 h-6 mb-3 text-amber-500" />
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Customer Rating</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">4.8 / 5.0</p>
          <p className="text-xs text-slate-500 mt-1">Based on 214 reviews</p>
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;