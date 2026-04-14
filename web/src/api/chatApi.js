import httpClient from "./httpClient";

const API_URL = "http://localhost:7001/api/chat";

export const fetchHistory = () => httpClient.get(`${API_URL}/history`);

export const fetchSession = (id) => httpClient.get(`${API_URL}/session/${id}`);

export const sendMessage = (data) =>
  httpClient.post(`${API_URL}`, data);
