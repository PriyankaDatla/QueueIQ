import {
  MapPin,
  Building2,
  ArrowRight,
  Clock3,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function QueueCard({
  id,
  name,
  location,
  type,
  status,
  waitingCount = Math.floor(Math.random() * 15) + 1,
  estimatedWait = Math.floor(Math.random() * 25) + 5,
}) {
  const navigate = useNavigate();

  const isOpen = status === "OPEN";

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Top Strip */}
      <div
        className={`h-2 ${
          isOpen ? "bg-sky-500" : "bg-slate-400"
        }`}
      />

      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-start">

          <div className="flex gap-4">

            <div className="h-14 w-14 rounded-2xl bg-sky-100 flex items-center justify-center group-hover:scale-110 transition">
              <Building2 size={26} className="text-sky-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                {name}
              </h3>

              <p className="text-slate-500 mt-1">
                {type || "General Service"}
              </p>
            </div>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isOpen
                ? "bg-sky-100 text-sky-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {status}
          </span>

        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mt-6 text-slate-600">

          <MapPin size={18} />

          <span>{location || "Location unavailable"}</span>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-gradient-to-br from-slate-50 to-white shadow-sm rounded-2xl p-4">

            <div className="flex items-center gap-2 text-slate-500">

              <Users size={18} />

              <span className="text-sm">
                Waiting
              </span>

            </div>

            <h4 className="text-2xl font-bold mt-2 text-slate-800">
              {waitingCount}
            </h4>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <div className="flex items-center gap-2 text-slate-500">

              <Clock3 size={18} />

              <span className="text-sm">
                Avg Wait
              </span>

            </div>

            <h4 className="text-2xl font-bold mt-2 text-slate-800">
              {estimatedWait} min
            </h4>

          </div>

        </div>

        {/* Footer */}
        <button
          disabled={!isOpen}
          onClick={() => navigate(`/queue/${id}`)}
          className={`w-full mt-7 py-3 rounded-2xl font-semibold flex justify-center items-center gap-2 transition-all ${
            isOpen
              ? "bg-sky-500 hover:bg-sky-700 text-white"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isOpen ? "Join Queue" : "Queue Closed"}

          {isOpen && <ArrowRight size={18} />}
        </button>

      </div>
    </div>
  );
}

export default QueueCard;