import axios from "axios";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_URL,
});

export const getWatchlists = () =>
  API.get("/watchlists");

export const saveWatchlists = (watchlists) =>
  API.post("/watchlists", watchlists);

export const searchStocks = (name) =>
  API.get(`/search/${name}`);

export const getHistory = (code, range = "1M") =>
  API.get(`/history/${code}?range=${range}`);

export const socket = io(
  API_URL.replace("/api", "")
);