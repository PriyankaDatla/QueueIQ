import {
  MapPin,
  Clock3,
  Users,
  Star,
  X,
  CheckCircle2,
} from "lucide-react";

export default function QueueDetailsModal({ queue, onClose }) {
  if (!queue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                <CheckCircle2 size={16} />
                {queue.recommendation}
              </div>

              <h2 className="text-3xl font-black">
                {queue.queueName}
              </h2>

              <p className="mt-3 opacity-90">
                {queue.address}
              </p>
            </div>

            <div className="rounded-2xl bg-white/20 px-5 py-4 text-center backdrop-blur">
              <p className="text-xs uppercase tracking-wider opacity-90">
                AI Score
              </p>

              <p className="text-3xl font-black">
                {queue.recommendationScore.toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-500" />
                <div>
                  <p className="text-sm text-slate-500">Distance</p>
                  <p className="text-xl font-bold">
                    {queue.distance.toFixed(2)} km
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg">
              <div className="flex items-center gap-3">
                <Clock3 className="text-orange-500" />
                <div>
                  <p className="text-sm text-slate-500">Estimated Wait</p>
                  <p className="text-xl font-bold">
                    {queue.estimatedWait} mins
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg">
              <div className="flex items-center gap-3">
                <Users className="text-cyan-500" />
                <div>
                  <p className="text-sm text-slate-500">Queue Size</p>
                  <p className="text-xl font-bold">
                    {queue.currentQueueSize}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg">
              <div className="flex items-center gap-3">
                <Star className="text-yellow-500" />
                <div>
                  <p className="text-sm text-slate-500">Rating</p>
                  <p className="text-xl font-bold">
                    ⭐ {queue.rating}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* AI Analysis */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6">

            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-slate-700">
                Recommendation Score
              </span>

              <span className="text-2xl font-black text-emerald-600">
                {queue.recommendationScore.toFixed(1)}
              </span>
            </div>

            <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                style={{
                  width: `${Math.min(queue.recommendationScore, 100)}%`,
                }}
              />
            </div>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-slate-600">
                  Queue Health
                </span>

                <span className="font-bold">
                  {queue.queueHealth}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">
                  Available Slots
                </span>

                <span className="font-bold text-blue-600">
                  {queue.availableSlots}
                </span>
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end">

            <button
              onClick={onClose}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
            >
              Got It
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}