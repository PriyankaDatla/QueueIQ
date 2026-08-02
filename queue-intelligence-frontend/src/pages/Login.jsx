import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock3,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-2xl grid lg:grid-cols-2">

        {/* LEFT */}

        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-14 text-white flex flex-col justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur">

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

              Skip Waiting.

              <br />

              Choose Smarter.

            </h2>

            <p className="mt-6 text-blue-100 text-lg">

              AI-powered recommendations help you find the fastest queue nearby.

            </p>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <MapPin className="text-cyan-300" />

              Live Queue Tracking

            </div>

            <div className="flex items-center gap-3">

              <Clock3 className="text-cyan-300" />

              Smart Wait Predictions

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

            Welcome Back

          </h2>

          <p className="mt-2 text-slate-500">

            Login to continue using QueueIQ.

          </p>

          <div className="mt-10 space-y-6">

            <div>

              <label className="mb-2 block font-medium">
                Email
              </label>

              <div className="flex items-center rounded-2xl border border-slate-300 px-4">

                <Mail className="text-slate-400" size={20} />

                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full px-3 py-4 outline-none"
                  placeholder="Enter your email"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Password
              </label>

              <div className="flex items-center rounded-2xl border border-slate-300 px-4">

                <Lock className="text-slate-400" size={20}/>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full px-3 py-4 outline-none"
                  placeholder="Enter password"
                />

                <button
                  onClick={()=>setShowPassword(!showPassword)}
                >

                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}

                </button>

              </div>

            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-4 font-bold text-white transition hover:scale-[1.02]"
            >

              <div className="flex items-center justify-center gap-2">

                Login

                <ArrowRight size={18}/>

              </div>

            </button>

            <p className="text-center text-slate-500">

              Don't have an account?

              <button
                onClick={()=>navigate("/register")}
                className="ml-2 font-semibold text-blue-700"
              >

                Register

              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}