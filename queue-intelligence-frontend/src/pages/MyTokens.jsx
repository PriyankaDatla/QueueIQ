import { useEffect, useState } from "react";
import { getUserTokens, cancelToken } from "../services/queueService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Ticket,
  MapPin,
  Clock3,
  ArrowRight,
  XCircle,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

function MyTokens() {
  const [tokens, setTokens] = useState([]);
  const navigate = useNavigate();

  const fetchTokens = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await getUserTokens(userId);
      setTokens(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tokens");
    }
  };

  const handleCancel = async (tokenId) => {
    try {
      await cancelToken(tokenId);
      toast.success("Token Cancelled Successfully");
      fetchTokens();
    } catch (error) {
      console.error(error);
      toast.error("Unable to cancel token");
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const getStatus = (status) => {
    switch (status) {
      case "WAITING":
        return "bg-yellow-100 text-yellow-700";
      case "SERVING":
        return "bg-green-100 text-green-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-black">
            My Tokens
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your active and completed queue tickets.
          </p>

        </div>

        <div className="mt-5 md:mt-0 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 px-8 py-5 text-white shadow-lg">

          <p className="text-sm opacity-90">
            Total Tokens
          </p>

          <h2 className="text-4xl font-black">
            {tokens.length}
          </h2>

        </div>

      </div>

      {tokens.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">

          <Ticket size={60} className="mx-auto text-slate-300" />

          <h2 className="mt-5 text-2xl font-bold">
            No Tokens Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Join a queue to see your tickets here.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {tokens.map((token) => (

            <div
              key={token.tokenId}
              className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-6 text-white">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-black">
                      {token.queue.queueName}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-blue-100">

                      <MapPin size={16} />

                      {token.queue.location}

                    </div>

                  </div>

                  <div className="rounded-2xl bg-white/20 px-6 py-4 text-center backdrop-blur">

                    <p className="text-xs uppercase">
                      Token
                    </p>

                    <h2 className="text-3xl font-black">
                      #{token.tokenNumber}
                    </h2>

                  </div>

                </div>

              </div>

              <div className="p-6">

                <div className="grid gap-5 md:grid-cols-3">

                  <div>

                    <p className="text-sm text-slate-500">
                      Service
                    </p>

                    <p className="mt-1 font-semibold">
                      {token.queue.serviceType}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Joined
                    </p>

                    <p className="mt-1 font-semibold">
                      {new Date(token.joinTime).toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Status
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-semibold ${getStatus(
                        token.status
                      )}`}
                    >
                      {token.status}
                    </span>

                  </div>

                </div>

                <div className="mt-8 flex flex-wrap gap-4">

                  <button
                    onClick={() =>
                      navigate(`/token-status/${token.tokenId}`)
                    }
                    className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                  >
                    <ArrowRight size={18} />
                    Track Status
                  </button>

                  {token.status === "WAITING" && (
                    <button
                      onClick={() => handleCancel(token.tokenId)}
                      className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <XCircle size={18} />
                      Cancel Token
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyTokens;