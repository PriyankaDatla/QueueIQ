import API from "./api";

export const joinQueue = async (queueId) => {
  const userId = localStorage.getItem("userId");

  return API.post("/queues/join", {
    userId: Number(userId),
    queueId: Number(queueId),
  });
};

export const getQueues = () => API.get("/queues");

export const getUserTokens = (userId) =>
  API.get(`/queues/tokens/${userId}`);

export const getTokenStatus = (tokenId) =>
  API.get(`/queues/status/${tokenId}`);

export const createQueue = (queue) =>
  API.post("/queues", queue);

export const getAnalytics = () =>
  API.get("/queues/analytics");


export const getHeatmap = async () => {
    const response = await API.get("/queues/heatmap");
    return response.data;
};

export const cancelToken = (tokenId) =>
  API.post(`/queues/cancel/${tokenId}`);

export const getRecommendations = async (
  serviceType,
  latitude,
  longitude
) => {

  const response = await API.get(
    `/recommendations/${serviceType}?latitude=${latitude}&longitude=${longitude}`
  );

  return response.data;
};

export const getCustomerAnalytics = async () => {
    const response = await API.get("/queues/customer-analytics");
    return response.data;
};