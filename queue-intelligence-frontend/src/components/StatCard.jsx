export default function StatCard({
  title,
  value,
  icon,
  color = "text-blue-500",
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-slate-200/70
        bg-white/80
        backdrop-blur-xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-2xl
      "
    >
      {/* Top Glow */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"></div>

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100"></div>

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`
            flex h-16 w-16 items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            from-slate-100
            to-white
            shadow-md
            ${color}
          `}
        >
          {icon}
        </div>

      </div>

      <div className="mt-6 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
      </div>

    </div>
  );
}