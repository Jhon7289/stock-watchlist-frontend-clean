const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_URL,
});

export const searchStocks = (name) =>
  API.get(`/api/search/${name}`);