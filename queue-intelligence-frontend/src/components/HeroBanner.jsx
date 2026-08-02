import { MapPin, Navigation, Sparkles, Loader2 } from "lucide-react";

export default function HeroBanner({
    location,
    onUseLocation,
    loading
}) {

    return (

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-8 text-white shadow-xl">

            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"></div>
            <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_45%)]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                {/* Left */}

                <div>

                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-5">

                        <Sparkles size={16} />

                        AI Queue Recommendation Engine

                    </div>

                    <h1 className="text-5xl lg:text-6xl font-black leading-tight">

                        Find the Best Queue

                        <br />

                        Before Everyone Else

                    </h1>

                    <p className="mt-4 max-w-2xl text-blue-100 text-lg">

                        QueueIQ analyzes nearby queues using
                        distance, waiting time, crowd size and ratings
                        to recommend the smartest option.

                    </p>

                    <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4">

                        <MapPin size={18} />

                        <span>

                            {location}

                        </span>

                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-col gap-4 min-w-[270px]">

                    <button

                        onClick={onUseLocation}

                        disabled={loading}

                        className="bg-white text-slate-900 rounded-2xl py-4 font-bold shadow-2xl hover:scale-105 hover:shadow-blue-500/30 transition-all duration-300"

                    >

                        {loading ? (

                            <span className="flex justify-center items-center gap-2">

                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />

                                Detecting...

                            </span>

                        ) : (

                            <span className="flex justify-center items-center gap-2">

                                <Navigation size={18} />

                                Detect My Location

                            </span>

                        )}

                    </button>

                    <div className="grid grid-cols-3 gap-3">

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-4 text-center">

                            <p className="text-xs text-blue-200 uppercase tracking-wider">
                                AI
                            </p>

                            <h2 className="text-3xl font-black">
                                98%
                            </h2>

                            <p className="text-xs text-blue-100 mt-1">
                                Accuracy
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-4 text-center">

                            <p className="text-xs text-blue-200 uppercase tracking-wider">
                                Live
                            </p>

                            <h2 className="text-3xl font-black">
                                GPS
                            </h2>

                            <p className="text-xs text-blue-100 mt-1">
                                Tracking
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-4 text-center">

                            <p className="text-xs text-blue-200 uppercase tracking-wider">
                                Smart
                            </p>

                            <h2 className="text-3xl font-black">
                                ETA
                            </h2>

                            <p className="text-xs text-blue-100 mt-1">
                                Prediction
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}