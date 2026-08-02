import {
  MapPin,
  Clock3,
  Users,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RecommendationCard({
  queue,
  onJoin,
  onClick,
  selected,
}) {
  const queueLoad = Math.min(
    (queue.currentQueueSize / 20) * 100,
    100
  );

  const loadStatus =
    queueLoad < 35
      ? "Low"
      : queueLoad < 70
      ? "Medium"
      : "High";

  const progressColor =
    loadStatus === "Low"
      ? "bg-emerald-500"
      : loadStatus === "Medium"
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl border bg-white transition-all duration-500 cursor-pointer
      ${
        selected
          ? "border-blue-500 ring-4 ring-blue-100 shadow-[0_20px_60px_rgba(37,99,235,0.18)] scale-[1.02]"
          : "border-slate-200 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
      }`}
    >
      {/* Glow */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-100 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100"></div>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 px-6 py-5">

        <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-white/10 blur-2xl"></div>

        <div className="relative flex justify-between items-start">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-blue-100 backdrop-blur">

              <Sparkles size={13} />

              AI Recommendation

            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">

              {queue.recommendation}

            </h3>

            <span className="inline-flex mt-3 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">

              ● LIVE

            </span>

          </div>

          <div className="rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">

            <div className="text-3xl font-black text-white">

              {queue.recommendationScore.toFixed(0)}

            </div>

            <div className="text-xs text-blue-100 text-center">

              AI Score

            </div>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        <h2 className="text-3xl font-black text-slate-900">

          {queue.queueName}

        </h2>

        <p className="mt-2 text-slate-500">

          {queue.address}

        </p>

        <div className="mt-4 inline-flex rounded-full bg-blue-50 px-4 py-2">

          <span className="font-semibold text-blue-700">

            {queue.serviceType}

          </span>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 mt-7">

          <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">

            <MapPin className="text-sky-500 mb-2" size={22} />

            <p className="text-xs text-slate-500">

              Distance

            </p>

            <h3 className="font-bold text-lg">

              {queue.distance.toFixed(1)} km

            </h3>

          </div>

          <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">

            <Clock3 className="text-orange-500 mb-2" size={22} />

            <p className="text-xs text-slate-500">

              Wait Time

            </p>

            <h3 className="font-bold text-lg">

              {queue.estimatedWait} mins

            </h3>

          </div>

          <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">

            <Users className="text-blue-500 mb-2" size={22} />

            <p className="text-xs text-slate-500">

              Queue Size

            </p>

            <h3 className="font-bold text-lg">

              {queue.currentQueueSize}

            </h3>

          </div>

          <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">

            <Star className="text-yellow-500 mb-2" size={22} />

            <p className="text-xs text-slate-500">

              Rating

            </p>

            <h3 className="font-bold text-lg">

              {queue.rating}

            </h3>

          </div>

        </div>

        {/* Queue Load */}

        <div className="mt-8">

          <div className="flex justify-between mb-2">

            <span className="font-medium text-slate-600">

              Queue Load

            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                loadStatus === "Low"
                  ? "bg-green-100 text-green-700"
                  : loadStatus === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {loadStatus}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">

            <div
              className={`${progressColor} h-full rounded-full transition-all duration-700`}
              style={{
                width: `${queueLoad}%`,
              }}
            />

          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-500">

            <span>

              {queueLoad.toFixed(0)}% occupied

            </span>

            <span className="font-semibold text-emerald-600">

              Excellent Match

            </span>

          </div>

        </div>

        {/* Button */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onJoin(queue.queueId);
          }}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-400/40"
        >
          Join Queue

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
}