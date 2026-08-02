import { useEffect, useState } from "react";
import { getAnalytics, getTrend, getDistribution,getTopQueues, getRecentActivities } from "../services/analyticsService";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

import {
    Activity,
    Users,
    Clock3,
    TrendingUp
} from "lucide-react";



export default function AdminAnalytics(){

    const COLORS=[
            "#1e3a8a",
            "#2563eb",
            "#38bdf8",
            "#60a5fa"
        ];

    const [summary, setSummary] = useState(null);
    const [trendData, setTrendData] = useState([]);
    const [distribution, setDistribution] = useState([]);
    const [topQueues, setTopQueues] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {

        try {

            const data = await getAnalytics();
            const trend = await getTrend();
            const distribution = await getDistribution();
            const top = await getTopQueues();
            const recent = await getRecentActivities();

            setSummary(data);
            setTrendData(trend);
            setDistribution(distribution);
            setTopQueues(top);
            setActivities(recent);

        } catch (err) {
            console.error(err);
        }

    };

    if (!summary) {
        return (
            <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
                Loading Analytics...
            </div>
        );
    }









return(

<div className="min-h-screen bg-slate-100 p-8">

<div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 text-white">

<h1 className="text-4xl font-bold">

QueueIQ Analytics

</h1>

<p className="mt-2 text-blue-100">

Real-time queue performance dashboard

</p>

</div>

<div className="grid md:grid-cols-4 gap-6 mt-8">

<div className="bg-white rounded-2xl p-6 shadow">

<Activity className="text-blue-700"/>

<h3 className="mt-4 text-slate-500">

Active Queues

</h3>

<p className="text-3xl font-bold mt-2">

{summary.activeQueues}

</p>

</div>

<div className="bg-white rounded-2xl p-6 shadow">

<Clock3 className="text-blue-700"/>

<h3 className="mt-4 text-slate-500">

Average Wait

</h3>

<p className="text-3xl font-bold mt-2">

{summary.averageWaitTime} min

</p>

</div>

<div className="bg-white rounded-2xl p-6 shadow">

<Users className="text-blue-700"/>

<h3 className="mt-4 text-slate-500">

Customers

</h3>

<p className="text-3xl font-bold mt-2">

{summary.totalCustomersServed}

</p>

</div>

<div className="bg-white rounded-2xl p-6 shadow">

<TrendingUp className="text-blue-700"/>

<h3 className="mt-4 text-slate-500">

Peak Hour

</h3>

<p className="text-3xl font-bold mt-2">

{summary.busiestHour}

</p>

</div>

</div>
<div className="grid lg:grid-cols-3 gap-8 mt-8">

    {/* Line Chart */}

    <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">

            Queue Trend

        </h2>

        <ResponsiveContainer width="100%" height={320}>

            <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="day"/>

                <YAxis/>

                <Tooltip/>

                <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#1e3a8a"
                    strokeWidth={4}
                />

            </LineChart>

        </ResponsiveContainer>

    </div>

    {/* Pie Chart */}

    <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">

            Queue Distribution

        </h2>

        <ResponsiveContainer width="100%" height={320}>

            <PieChart>

                <Pie
                    data={distribution}
                    dataKey="totalCustomers"
                    nameKey="queueType"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {distribution.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Tooltip/>

            </PieChart>

        </ResponsiveContainer>

    </div>

</div>
<div className="grid lg:grid-cols-2 gap-8 mt-8">

    {/* Top Queues */}

    <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">

            Top Performing Queues

        </h2>

        <table className="w-full">

            <thead>

                <tr className="text-left border-b">

                    <th className="pb-3">Queue</th>
                    <th className="pb-3">Customers</th>
                    <th className="pb-3">Wait</th>
                    <th className="pb-3">Rating</th>

                </tr>

            </thead>

            <tbody>
                {topQueues.map((queue) => (
                    <tr
                        key={queue.queueName}
                        className="border-b hover:bg-slate-50"
                    >
                        <td className="py-4 font-medium">
                            {queue.queueName}
                        </td>

                        <td>
                            {queue.customers}
                        </td>

                        <td>
                            {queue.averageWait} min
                        </td>

                        <td>
                            ⭐ {queue.rating}
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>

    </div>

    {/* Recent Activity */}

    <div className="space-y-4">

        {activities.map((activity, index) => (

            <div
                key={index}
                className="flex items-center justify-between bg-slate-50 rounded-xl p-4"
            >

                <div className="flex items-center gap-3">

                    <span className="text-2xl">

                        {activity.type === "JOIN" && "🟢"}

                        {activity.type === "SERVING" && "🔵"}

                        {activity.type === "COMPLETED" && "✅"}

                        {activity.type === "CANCELLED" && "🔴"}

                        {activity.type === "INFO" && "🟣"}

                    </span>

                    <div>

                        <p className="font-medium">

                            {activity.activity}

                        </p>

                        <p className="text-sm text-slate-500">

                            {activity.time}

                        </p>

                    </div>

                </div>

            </div>

        ))}

    </div>

</div>

</div>

);

}