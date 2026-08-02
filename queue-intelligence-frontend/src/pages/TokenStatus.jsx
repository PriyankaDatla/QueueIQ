import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTokenStatus } from "../services/queueService";

function TokenStatus() {

  const { tokenId } = useParams();

  const [status, setStatus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {

    const fetchStatus = () => {
      getTokenStatus(tokenId)
        .then((response) => {
            setStatus(response.data);
            setLastUpdated(new Date().toLocaleTimeString());
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // Load immediately
    fetchStatus();

    // Refresh every 5 seconds
    const interval = setInterval(fetchStatus, 5000);

    // Cleanup when leaving page
    return () => clearInterval(interval);

  }, [tokenId]);

  if (!status) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] p-8">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">

          <h1 className="text-3xl font-bold mb-2">
              Token Status
          </h1>

          <p className="text-slate-500">
              Auto-refreshes every 5 seconds
          </p>

          <p className="text-sm text-slate-400 mb-8">
              Last Updated: {lastUpdated}
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-sky-50 p-6 rounded-2xl">
              <p className="text-slate-500">
                Token Number
              </p>

              <h2 className="text-4xl font-bold mt-2">
                #{status.tokenNumber}
              </h2>
            </div>

            <div className="bg-sky-50 p-6 rounded-2xl">
              <p className="text-slate-500">
                Position
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {status.position}
              </h2>
            </div>

            <div className="bg-sky-50 p-6 rounded-2xl">
              <p className="text-slate-500">
                Estimated Wait
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {status.estimatedWait} min
              </h2>
            </div>

            <div className="bg-sky-50 p-6 rounded-2xl">
              <p className="text-slate-500">
                Status
              </p>

              <h2 className="text-2xl font-bold mt-2 text-green-600">
                {status.status}
              </h2>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TokenStatus;