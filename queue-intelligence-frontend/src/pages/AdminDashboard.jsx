import {
  PlusCircle,
  Users,
  DoorOpen,
  DoorClosed,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const actions = [
    {
      title: "Create Queue",
      icon: <PlusCircle size={28} />,
      color: "bg-sky-100 text-sky-600",
      onClick: () => navigate("/admin/create")
    },
    {
      title: "Serve Next Token",
      icon: <Users size={28} />,
      color: "bg-green-100 text-green-600",
      onClick: () => navigate("/admin/serve-next")
    },
    {
      title: "Open Counter",
      icon: <DoorOpen size={28} />,
      color: "bg-yellow-100 text-yellow-700",
      onClick: () => navigate("/admin/open-counter")
    },
    {
      title: "Close Counter",
      icon: <DoorClosed size={28} />,
      color: "bg-red-100 text-red-600",
      onClick: () => navigate("/admin/close-counter")
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={28} />,
      color: "bg-purple-100 text-purple-600",
      onClick: () => navigate("/admin/analytics")
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7FAFC] p-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Manage queues and counters.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {actions.map((action) => (

          <div
            key={action.title}
            onClick={action.onClick}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition cursor-pointer"
          >

            <div
              className={`h-16 w-16 rounded-2xl flex items-center justify-center ${action.color}`}
            >
              {action.icon}
            </div>

            <h2 className="text-2xl font-semibold mt-6">
              {action.title}
            </h2>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;