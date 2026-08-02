import { useParams } from "react-router-dom";
import { MapPin, Building2, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { getQueues, joinQueue } from "../services/queueService";
import API from "../services/api";
function QueueDetails() {

 const { id } = useParams();

 const [message, setMessage] = useState("");
 const [queue, setQueue] = useState(null);
 useEffect(() => {

   getQueues()
     .then((response) => {

       const selectedQueue =
         response.data.find(
           q => q.queueId === Number(id)
         );

       setQueue(selectedQueue);

     })
     .catch(console.error);

 }, [id]);
  const handleJoinQueue = async () => {
    try {
      const response = await joinQueue(id);
      setMessage(response.data);

      setMessage(response.data);

    } catch (error) {
      console.error(error);
      setMessage("Failed to join queue");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-2xl bg-sky-100 flex items-center justify-center">
              <Building2 size={28} className="text-sky-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Queue Details
              </h1>

              <p className="text-slate-500">
                Queue ID: {id}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-sky-50 p-5 rounded-2xl">
              <p className="text-slate-500 text-sm">Location</p>

              <div className="flex items-center gap-2 mt-2">
                <MapPin size={18} />
                {queue?.location || "Not Available"}
              </div>
            </div>

            <div className="bg-sky-50 p-5 rounded-2xl">
              <p className="text-slate-500 text-sm">Service Type</p>

              <p className="mt-2 font-medium">
                {queue?.serviceType || "General"}
              </p>
            </div>

            <div className="bg-sky-50 p-5 rounded-2xl">
              <p className="text-slate-500 text-sm">Status</p>

              <p
                className={`mt-2 font-semibold ${
                  queue?.status === "OPEN"
                    ? "text-sky-600"
                    : "text-slate-500"
                }`}
              >
                {queue?.status || "Unknown"}
              </p>
            </div>

          </div>

          <div className="mt-10 bg-slate-50 rounded-3xl p-6">

            <div className="flex items-center gap-2 mb-4">
              <Clock3 size={20} />
              <h3 className="font-semibold">
                Estimated Wait Time
              </h3>
            </div>

            <p className="text-4xl font-bold text-sky-600">
              {queue?.estimatedWait
                ? `${queue.estimatedWait} mins`
                : "Calculating..."}
            </p>

          </div>

          <button
            onClick={handleJoinQueue}
            className="w-full mt-8 bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-2xl font-semibold transition"
          >
            Join Queue
          </button>
          {

              message && (
                <div className="mt-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl">
                  🎟 {message}
                </div>
              )


          }

        </div>

      </div>

    </div>
  );
}

export default QueueDetails;