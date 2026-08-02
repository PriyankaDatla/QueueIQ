import { useEffect, useState } from "react";
import {
  Sparkles,
  MapPinned,
  LoaderCircle,
  SearchX,
} from "lucide-react";

import RecommendationCard from "../components/RecommendationCard";
import { getRecommendations } from "../services/recommendationService";
import { joinQueue } from "../services/queueService";
import toast from "react-hot-toast";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serviceType, setServiceType] = useState("HOSPITAL");

  const services = [
    "BANK",
    "HOSPITAL",
    "PHARMACY",
    "RTO",
    "RESTAURANT",
    "GOVERNMENT_OFFICE",
    "POST_OFFICE",
    "DIAGNOSTIC_CENTER",
  ];

  useEffect(() => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const data = await getRecommendations(
          serviceType,
          position.coords.latitude,
          position.coords.longitude
        );

        setRecommendations(data);
      } catch (err) {
        console.error(err);
        toast.error("Unable to load recommendations");
      } finally {
        setLoading(false);
      }
    });
  }, [serviceType]);

  const handleJoin = async (queueId) => {
    try {
      await joinQueue(queueId);

      toast.success("Successfully joined the queue!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to join queue");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-10 text-white">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">

              <Sparkles size={18} />

              AI Powered

            </div>

            <h1 className="text-4xl font-black">

              Smart Queue Recommendations

            </h1>

            <p className="mt-3 max-w-2xl text-blue-50">

              QueueIQ analyzes distance, waiting time, queue size and ratings
              to recommend the best queue near your current location.

            </p>

          </div>

          <div className="rounded-3xl bg-white/20 p-6 text-center backdrop-blur">

            <p className="text-sm uppercase tracking-wide">

              Recommendations

            </p>

            <h2 className="mt-2 text-5xl font-black">

              {recommendations.length}

            </h2>

          </div>

        </div>

      </div>

      {/* Toolbar */}

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <MapPinned className="text-blue-600" />

            <span className="font-semibold text-slate-700">

              Filter by Service

            </span>

          </div>

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 font-medium outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service.replaceAll("_", " ")}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Loading */}

      {loading && (

        <div className="rounded-3xl bg-white py-24 text-center shadow-sm">

          <LoaderCircle
            size={50}
            className="mx-auto animate-spin text-blue-600"
          />

          <h2 className="mt-6 text-2xl font-bold">

            Finding the Best Queues...

          </h2>

          <p className="mt-2 text-slate-500">

            AI is analyzing nearby locations.

          </p>

        </div>

      )}

      {/* Empty */}

      {!loading && recommendations.length === 0 && (

        <div className="rounded-3xl bg-white py-24 text-center shadow-sm">

          <SearchX
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-2xl font-bold">

            No Queues Found

          </h2>

          <p className="mt-2 text-slate-500">

            Try selecting another service type.

          </p>

        </div>

      )}

      {/* Cards */}

      {!loading && recommendations.length > 0 && (

        <div className="grid gap-8 lg:grid-cols-2">

          {recommendations.map((queue) => (

            <RecommendationCard
              key={queue.queueId}
              queue={queue}
              selected={selected === queue.queueId}
              onClick={() => setSelected(queue.queueId)}
              onJoin={handleJoin}
            />

          ))}

        </div>

      )}

    </div>
  );
}