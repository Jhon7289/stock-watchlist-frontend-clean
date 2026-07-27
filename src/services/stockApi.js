import axios from "axios";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_URL,
});

// Get watchlists
export const getWatchlists = () =>
  API.get("/api/watchlists");

// Save watchlists
export const saveWatchlists = (watchlists) =>
  API.post("/api/watchlists", watchlists);

// Search stocks
export const searchStocks = (name) =>
  API.get(`/api/search/${name}`);

// Get stock history
export const getHistory = async (code, range = "1D") => {
  const response = await axios.get(
    `${API_URL}/api/history/${code}`,
    {
      params: {
        range
      }
    }
  );

  return response;
};
// Socket connection
export const socket = io(API_URL);