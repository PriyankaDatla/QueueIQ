import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import {
    Activity,
    CheckCircle2,
    Clock3,
    TrendingUp,
    XCircle,
    Sparkles,
} from "lucide-react";

import { getCustomerAnalytics } from "../services/queueService";

function Card({ icon, title, value }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-black">
                        {value}
                    </h2>

                </div>

                <div className="rounded-2xl bg-slate-100 p-4">
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default function Analytics() {

    const [analytics, setAnalytics] = useState({
        queuesJoined: 0,
        completedVisits: 0,
        averageWait: 0,
        cancelledQueues: 0,
        totalTimeSaved: 0,
        efficiencyScore: 0,
        activity: [],
    });

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const data = await getCustomerAnalytics();
            console.log(data);
            setAnalytics(data);
        } catch (err) {
            console.error("Failed to load analytics", err);
        }
    };

    return (
        <div className="p-8">

            <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">

                <div>

                    <h1 className="text-4xl font-black text-slate-900">
                        Analytics Dashboard
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Track your queue activity and AI performance.
                    </p>

                </div>

                <div className="mt-5 md:mt-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-white shadow-lg">

                    <div className="flex items-center gap-2">

                        <Sparkles size={18} />

                        AI Powered Insights

                    </div>

                </div>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 mb-10">

            <Card
                icon={<Activity className="text-blue-600" />}
                title="Queues Joined"
                value={analytics.queuesJoined}
            />

            <Card
                icon={<CheckCircle2 className="text-emerald-500" />}
                title="Completed Visits"
                value={analytics.completedVisits}
            />

            <Card
                icon={<Clock3 className="text-orange-500" />}
                title="Average Wait"
                value={`${analytics.averageWait.toFixed(1)} min`}
            />

            <Card
                icon={<XCircle className="text-red-500" />}
                title="Cancelled"
                value={analytics.cancelledQueues}
            />

            <Card
                icon={<TrendingUp className="text-violet-500" />}
                title="Time Saved"
                value={`${analytics.totalTimeSaved} min`}
            />

            <Card
                icon={<Sparkles className="text-cyan-500" />}
                title="Efficiency"
                value={`${analytics.efficiencyScore.toFixed(1)}%`}
            />

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold">
                            Queue Activity
                        </h2>

                        <p className="text-slate-500">
                            Daily queue history
                        </p>

                    </div>

                    <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                        Last 7 Days
                    </div>

                </div>

                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={analytics.activity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="natural"
                            dataKey="queues"
                            stroke="#2563eb"
                            strokeWidth={4}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}