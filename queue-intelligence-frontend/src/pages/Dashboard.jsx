import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { getRecommendations, joinQueue } from "../services/queueService";

import HeroBanner from "../components/HeroBanner";
import QueueMap from "../components/QueueMap";
import RecommendationCard from "../components/RecommendationCard";
import QueueDetailsModal from "../components/QueueDetailsModal";
import StatCard from "../components/StatCard";
import SideBar from "../components/SideBar";
import {
  MapPin,
  Search,
  Activity,
  BarChart3,
  Clock3,
  Sparkles
} from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  const [queues, setQueues] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [userLocation, setUserLocation] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(false);

  const [selectedQueue, setSelectedQueue] = useState(null);

  const [selectedService, setSelectedService] =
      useState("HOSPITAL");

  const services = [
      "HOSPITAL",
      "BANK",
      "PHARMACY",
      "GOVERNMENT",
      "RESTAURANT"
  ];

  useEffect(() => {

      API.get("/queues")
          .then(res => setQueues(res.data))
          .catch(console.log);

  }, []);

  useEffect(() => {

      if (userLocation) detectLocation();

  }, [selectedService]);

  const detectLocation = () => {

      if (!navigator.geolocation) {

          toast.error("Geolocation not supported");

          return;
      }

      setLoadingLocation(true);

      navigator.geolocation.getCurrentPosition(

          async (position) => {

              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              setUserLocation({
                  latitude,
                  longitude
              });

              try {

                  const data =
                      await getRecommendations(
                          selectedService,
                          latitude,
                          longitude
                      );

                  setRecommendations(data);

              } catch (err) {

                  console.log(err);

              }

              setLoadingLocation(false);

          },

          () => {

              toast.error("Unable to fetch location");

              setLoadingLocation(false);

          }

      );

  };

  const handleLogout = () => {

      localStorage.removeItem("token");

      navigate("/login");

  };

  const filteredRecommendations =
      recommendations.filter((queue) => {

          const search = searchTerm.toLowerCase();

          return (

              (queue.queueName || "")
                  .toLowerCase()
                  .includes(search)

              ||

              (queue.address || "")
                  .toLowerCase()
                  .includes(search)

              ||

              (queue.serviceType || "")
                  .toLowerCase()
                  .includes(search)

          );

      });

    return (

     <div className="min-h-screen bg-[#F7FAFC] flex">

         <SideBar />

         <main className="flex-1 p-8 animate-fadeIn">

        {/* Hero */}
        <HeroBanner
            location={
                userLocation
                    ? `${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`
                    : "Location unavailable"
            }
            onUseLocation={detectLocation}
            loading={loadingLocation}
        />

        {/* Search & Filter */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hospitals, banks, pharmacies..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-4
                  pl-14
                  pr-5
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100
                "
              />

            </div>

            <button
              onClick={detectLocation}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-8
                font-semibold
                text-white
                shadow-lg
                transition-all
                hover:scale-105
              "
            >
              Refresh Nearby
            </button>

          </div>

        </div>

        {/* Service Filter */}

        <div className="flex flex-wrap gap-3 mt-6">

            {services.map(service=>{

                const active=selectedService===service;

                return(

                    <button
                        key={service}
                        onClick={()=>setSelectedService(service)}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
                        ${
                          active
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                            : "bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                    >

                        {service}

                    </button>

                );

            })}

        </div>

        {/* Statistics */}

        <div className="mt-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-black text-slate-900">

                        Dashboard Overview

                    </h2>

                    <p className="text-slate-500 mt-1">

                        Live insights generated by QueueIQ AI

                    </p>

                </div>

                <div className="mt-4 md:mt-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-white shadow-lg">

                    <span className="font-semibold">

                        Live Updates

                    </span>

                </div>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Nearby Places"
                    value={recommendations.length}
                    icon={<MapPin />}
                />

                <StatCard
                    title="Average Wait"
                    value={
                        recommendations.length
                            ? `${Math.round(
                                recommendations.reduce(
                                    (sum, q) => sum + q.estimatedWait,
                                    0
                                ) / recommendations.length
                            )} min`
                            : "--"
                    }
                    icon={<Clock3 />}
                    color="text-orange-500"
                />

                <StatCard
                    title="AI Score"
                    value={
                        recommendations.length
                            ? recommendations[0].recommendationScore.toFixed(0)
                            : "--"
                    }
                    icon={<Sparkles />}
                    color="text-emerald-500"
                />

                <StatCard
                    title="Open Queues"
                    value={queues.filter(q => q.status === "OPEN").length}
                    icon={<BarChart3 />}
                    color="text-violet-500"
                />

            </div>

        </div>

        {/* Recommendation Section */}

        <div className="mt-10 flex justify-between items-center">

            <div>

                <h2 className="text-3xl font-bold text-slate-800">

                    AI Smart Recommendations

                </h2>

                <p className="text-slate-500 mt-1">

                    Personalized recommendations generated using
                    distance, estimated waiting time,
                    live queue size and user ratings.

                </p>

            </div>

            <div className="bg-blue-50 px-5 py-3 rounded-xl">

                <span className="text-blue-700 font-semibold">

                    {filteredRecommendations.length}

                </span>

                <span className="text-slate-500">

                    {" "}Recommendations

                </span>

            </div>

        </div>

        {/* MAP + CARDS */}

        <div className="grid xl:grid-cols-5 gap-8 mt-8">

            <div className="xl:col-span-3">

                <QueueMap
                    userLocation={userLocation}
                    recommendations={recommendations}
                    selectedQueue={selectedQueue}
                    onMarkerClick={setSelectedQueue}
                />

            </div>

            <div className="xl:col-span-2">

                <div
                    className="
                        max-h-[760px]
                        overflow-y-auto
                        space-y-5
                        pr-2
                        scrollbar-thin
                        scrollbar-thumb-slate-300
                        scrollbar-track-transparent
                    "
                >

                    {filteredRecommendations.length>0 ? (
                        <>
                        <div className="mb-4 flex items-center justify-between">

                            <span className="text-sm font-semibold text-blue-600">

                                AI Ranked Results

                            </span>

                            <span className="text-sm text-slate-500">

                                Sorted by Recommendation Score

                            </span>

                        </div>

                        {filteredRecommendations.map((queue)=>(

                            <RecommendationCard

                                key={queue.queueId}

                                queue={queue}

                                selected={
                                    selectedQueue?.queueId===queue.queueId
                                }

                                onClick={()=>setSelectedQueue(queue)}

                                onJoin={async(queueId) => {

                                    try{

                                        await joinQueue(queueId);

                                        setSelectedQueue(null);

                                        detectLocation();

                                        toast.success("Successfully joined the queue!");

                                    }catch(err){

                                        console.log(err);

                                    }

                                }}

                            />

                        ))}
                        </>
                    ):(

                        <div className="bg-white rounded-2xl border p-10 text-center">

                            <Activity
                                className="mx-auto text-slate-400 mb-4"
                                size={50}
                            />

                            <h3 className="text-xl font-semibold">

                                No Recommendations

                            </h3>

                            <p className="text-slate-500 mt-2">

                                Try another service or refresh your location.

                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
        {selectedQueue && (
            <QueueDetailsModal
                queue={selectedQueue}
                onClose={() => setSelectedQueue(null)}
            />
        )}
    </main>
    </div>
  );
}

export default Dashboard;