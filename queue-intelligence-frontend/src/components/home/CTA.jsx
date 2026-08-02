import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28 bg-slate-950">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, scale: .95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
        className="relative max-w-6xl mx-auto px-6"
      >
        <div
          className="
            rounded-[40px]
            border
            border-white/10
            bg-gradient-to-r
            from-blue-900/40
            via-slate-900
            to-cyan-900/40
            backdrop-blur-xl
            p-14
            text-center
            shadow-2xl
          "
        >

          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
            🚀 Join QueueIQ Today
          </span>

          <h2 className="text-5xl font-black mt-8 leading-tight">

            Ready to Stop

            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              {" "}Waiting?

            </span>

          </h2>

          <p className="text-slate-300 mt-6 text-xl max-w-2xl mx-auto leading-8">
            Experience smarter queue management with real-time wait times,
            intelligent recommendations and interactive analytics.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                hover:scale-105
                transition
                font-semibold
                shadow-xl
                shadow-blue-500/30
              "
            >
              Create Free Account
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-8
                py-4
                rounded-2xl
                border
                border-white/20
                hover:bg-white/10
                transition
              "
            >
              <LogIn size={20} />
              Login
            </Link>

          </div>

        </div>
      </motion.div>

    </section>
  );
}