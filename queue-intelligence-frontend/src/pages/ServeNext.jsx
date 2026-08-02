import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function ServeNext() {

  const [queueId, setQueueId] = useState("");

  const handleServe = async () => {

    try {

      const response = await API.post(
        `/queues/serve-next/${queueId}`
      );

      toast.success(response.data);

    } catch (error) {

      console.error(error);
      toast.error("Failed to serve token!");

    }

  };

  return (

    <div className="min-h-screen bg-[#F7FAFC] flex justify-center items-center">

      <div className="bg-white rounded-3xl p-8 shadow-sm w-[450px]">

        <h1 className="text-3xl font-bold">
          Serve Next Token
        </h1>

        <input
          className="w-full mt-8 border p-4 rounded-xl"
          placeholder="Enter Queue ID"
          value={queueId}
          onChange={(e)=>setQueueId(e.target.value)}
        />

        <button
          onClick={handleServe}
          className="w-full mt-6 bg-green-500 text-white py-4 rounded-xl"
        >
          Serve Next
        </button>

      </div>

    </div>

  );

}

export default ServeNext;