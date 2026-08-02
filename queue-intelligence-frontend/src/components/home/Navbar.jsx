import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
        >
          QueueIQ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">

          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Icon */}
        <button className="md:hidden text-white">
          <Menu size={28} />
        </button>

      </div>
    </nav>
  );
}