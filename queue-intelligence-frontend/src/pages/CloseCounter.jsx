import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function CloseCounter() {

  const [counterId, setCounterId] = useState("");

  const handleClose = async () => {

    try {

      const response = await API.post(
        `/queues/counter/close/${counterId}`
      );

      toast.success(response.data);

    } catch (error) {

      console.error(error);
      toast.error("Failed to close counter!");

    }

  };

  return (

    <div className="min-h-screen bg-[#F7FAFC] flex justify-center items-center">

      <div className="bg-white rounded-3xl p-8 shadow-sm w-[450px]">

        <h1 className="text-3xl font-bold">
          Close Counter
        </h1>

        <input
          className="w-full mt-8 border rounded-xl p-4"
          placeholder="Counter ID"
          value={counterId}
          onChange={(e)=>setCounterId(e.target.value)}
        />

        <button
          onClick={handleClose}
          className="w-full mt-6 bg-red-500 text-white py-4 rounded-xl"
        >
          Close Counter
        </button>

      </div>

    </div>

  );

}

export default CloseCounter;