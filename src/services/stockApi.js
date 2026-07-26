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
export const getHistory = (code, range = "1M") =>
  API.get(`/api/history/${code}?range=${range}`);

// Socket connection
export const socket = io(API_URL);