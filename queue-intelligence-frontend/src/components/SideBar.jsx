import {
  LayoutDashboard,
  Map,
  Ticket,
  BarChart3,
  LogOut,
  Sparkles,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Recommendations",
      icon: Map,
      path: "/recommendation",
    },
    {
      name: "My Tokens",
      icon: Ticket,
      path: "/tokens",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col shadow-sm">

      {/* Logo */}

      <div className="p-8 border-b border-slate-200">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center shadow-lg">

            <Sparkles size={28} className="text-white" />

          </div>

          <div>

            <h1 className="text-3xl font-black text-slate-900">
              QueueIQ
            </h1>

            <p className="text-slate-500 text-sm">
              Smart Queue Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-6 space-y-3">

        {menus.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-lg"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`
              }
            >

              <Icon size={22} />

              {item.name}

            </NavLink>

          );

        })}

      </nav>

      {/* Logout */}

      <div className="p-6 border-t border-slate-200">

        <button
          onClick={logout}
          className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:opacity-90"
        >

          <div className="flex items-center justify-center gap-3">

            <LogOut size={20} />

            Logout

          </div>

        </button>

      </div>

    </aside>
  );
}