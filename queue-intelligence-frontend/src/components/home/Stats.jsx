import { motion } from "framer-motion";
import {
  Users,
  Clock3,
  Building2,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    title: "Users Served",
    color: "text-blue-400",
  },
  {
    icon: Building2,
    value: 25,
    suffix: "+",
    title: "Active Service Centers",
    color: "text-cyan-400",
  },
  {
    icon: Clock3,
    value: 95,
    suffix: "%",
    title: "Average Time Saved",
    color: "text-green-400",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    decimals: 1,
    title: "User Rating",
    color: "text-yellow-400",
  },
];

export default function Stats() {
  return (
    <section className="relative bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  rounded-3xl
                  p-8
                  shadow-xl
                  transition
                "
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 ${stat.color}`}
                >
                  <Icon size={28} />
                </div>

                <h2 className="text-4xl font-extrabold mt-6">
                  {stat.value}
                  {stat.suffix}
                </h2>

                <p className="mt-3 text-slate-400">
                  {stat.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}