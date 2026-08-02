import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 min-h-screen flex items-center">

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >
          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-cyan-300 text-sm">
            Smart Queue Recommendation Platform
          </span>

          <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-white">
            Skip the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Queue
            </span>
            <br />
            Not Your Time.
          </h1>

          <p className="mt-8 text-slate-300 text-xl leading-8">
            Find nearby queues with the shortest waiting time using smart
            recommendations, live analytics and real-time updates.
          </p>

          <div className="flex gap-5 mt-10">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold flex items-center gap-2 hover:scale-105 transition"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl border border-slate-600 hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="hidden lg:flex justify-center"
        >
          <img
            src="/hero.svg"
            alt="QueueIQ"
            className="w-full max-w-xl rounded-3xl shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}