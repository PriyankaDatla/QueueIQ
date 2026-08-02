import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQueue } from "../services/queueService";
import toast from "react-hot-toast";

function CreateQueue() {

  const navigate = useNavigate();

  const [queueName, setQueueName] = useState("");
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createQueue({
        queueName,
        location,
        serviceType
      });

      toast.success("Queue Created Successfully!");

      navigate("/admin");

    } catch (error) {

      console.error(error);
      toast.error("Failed to create queue!");

    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex justify-center items-center">

      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Create Queue
        </h1>

        <p className="text-slate-500 mt-2">
          Add a new service queue.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Queue Name"
            value={queueName}
            onChange={(e) => setQueueName(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Service Type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl font-semibold transition"
          >
            Create Queue
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateQueue;