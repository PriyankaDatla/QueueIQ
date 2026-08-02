import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock3,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-2xl grid lg:grid-cols-2">

        {/* LEFT */}

        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-14 text-white flex flex-col justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">

                <Sparkles />

              </div>

              <div>

                <h1 className="text-3xl font-black">
                  QueueIQ
                </h1>

                <p className="text-blue-100">
                  AI Queue Platform
                </p>

              </div>

            </div>

            <h2 className="mt-16 text-5xl font-black leading-tight">

              Join QueueIQ

              <br />

              Skip The Wait.

            </h2>

            <p className="mt-6 text-blue-100 text-lg">

              Create your account and discover the smartest queue using AI-powered recommendations.

            </p>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <MapPin className="text-cyan-300" />

              Find Nearby Queues

            </div>

            <div className="flex items-center gap-3">

              <Clock3 className="text-cyan-300" />

              Save Waiting Time

            </div>

            <div className="flex items-center gap-3">

              <Sparkles className="text-cyan-300" />

              AI Recommendations

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="p-14 flex flex-col justify-center">

          <h2 className="text-4xl font-black text-slate-800">

            Create Account

          </h2>

          <p className="mt-2 text-slate-500">

            Start using QueueIQ in less than a minute.

          </p>

          <div className="mt-10 space-y-6">

            {/* Name */}

            <div>

              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <div className="flex items-center rounded-2xl border border-slate-300 px-4">

                <User className="text-slate-400" size={20} />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-4 outline-none"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block font-medium">
                Email
              </label>

              <div className="flex items-center rounded-2xl border border-slate-300 px-4">

                <Mail className="text-slate-400" size={20} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-4 outline-none"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block font-medium">
                Password
              </label>

              <div className="flex items-center rounded-2xl border border-slate-300 px-4">

                <Lock className="text-slate-400" size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-3 py-4 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-slate-500" />
                  ) : (
                    <Eye size={20} className="text-slate-500" />
                  )}
                </button>

              </div>

            </div>

            {/* Register Button */}

            <button
              onClick={handleRegister}
              className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-4 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >

              <div className="flex items-center justify-center gap-2">

                Create Account

                <ArrowRight size={18} />

              </div>

            </button>

            <p className="text-center text-slate-500">

              Already have an account?

              <button
                onClick={() => navigate("/login")}
                className="ml-2 font-semibold text-blue-700 hover:underline"
              >

                Login

              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}