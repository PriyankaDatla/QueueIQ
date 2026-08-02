import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function OpenCounter() {

  const [counterName, setCounterName] = useState("");
  const [queueId, setQueueId] = useState("");
  const [avgServiceTime, setAvgServiceTime] = useState("");

  const handleOpen = async () => {

    try {

      const response = await API.post("/queues/counter/open", {
        queueId: Number(queueId),
        counterName,
        avgServiceTime: Number(avgServiceTime)
      });

      toast.success(response.data);

    } catch (error) {

      console.error(error);
      toast.error("Failed to open counter!");

    }

  };

  return (

    <div className="min-h-screen bg-[#F7FAFC] flex justify-center items-center">

      <div className="bg-white rounded-3xl p-8 shadow-sm w-[450px]">

        <h1 className="text-3xl font-bold">
          Open Counter
        </h1>

        <input
          className="w-full mt-8 border rounded-xl p-4"
          placeholder="Counter Name"
          value={counterName}
          onChange={(e)=>setCounterName(e.target.value)}
        />

        <input
          className="w-full mt-5 border rounded-xl p-4"
          placeholder="Queue ID"
          value={queueId}
          onChange={(e)=>setQueueId(e.target.value)}
        />

        <input
          className="w-full mt-5 border rounded-xl p-4"
          placeholder="Average Service Time (minutes)"
          value={avgServiceTime}
          onChange={(e)=>setAvgServiceTime(e.target.value)}
        />

        <button
          onClick={handleOpen}
          className="w-full mt-6 bg-yellow-500 text-white py-4 rounded-xl"
        >
          Open Counter
        </button>

      </div>

    </div>

  );

}

export default OpenCounter;