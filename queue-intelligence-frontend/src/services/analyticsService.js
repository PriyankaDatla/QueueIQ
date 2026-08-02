import API from "./api";

export const getAnalytics = async () => {
    const response = await API.get("/queues/analytics");
    return response.data;
};

export const getTrend = async () => {
    const response = await API.get("/queues/analytics/trend");
    return response.data;
};

export const getDistribution = async () => {
    const response = await API.get("/queues/analytics/distribution");
    return response.data;
};

export const getTopQueues = async () => {
    const response = await API.get("/queues/analytics/top-queues");
    return response.data;
};

export const getRecentActivities = async () => {
    const response = await API.get("/queues/analytics/recent");
    return response.data;
};