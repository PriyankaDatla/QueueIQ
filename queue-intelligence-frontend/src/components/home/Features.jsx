import { motion } from "framer-motion";
import {
  BrainCircuit,
  MapPinned,
  Clock3,
  BarChart3,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart Recommendations",
    description:
      "AI recommends the best queue using wait time, ratings, congestion and distance.",
  },
  {
    icon: MapPinned,
    title: "Live Queue Map",
    description:
      "Locate nearby hospitals, banks and service centers on an interactive map.",
  },
  {
    icon: Clock3,
    title: "Real-Time Wait Time",
    description:
      "Know the estimated waiting time before joining any queue.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track queue performance, customer activity and service insights.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "JWT-based authentication keeps customer and admin accounts protected.",
  },
  {
    icon: Smartphone,
    title: "Responsive Experience",
    description:
      "Access QueueIQ seamlessly from desktop, tablet or mobile devices.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {" "}Skip the Queue
            </span>
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            QueueIQ combines AI-powered recommendations,
            live queue tracking and analytics to help users
            spend less time waiting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                viewport={{ once: true }}
                transition={{ duration: .4 }}
                className="
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  rounded-3xl
                  p-8
                  shadow-xl
                  hover:border-blue-500/40
                  transition-all
                "
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mb-6">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}