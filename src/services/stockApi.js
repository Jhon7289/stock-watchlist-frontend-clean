export const getWatchlists = () =>
  API.get("/api/watchlists");

export const saveWatchlists = (watchlists) =>
  API.post("/api/watchlists", watchlists);

export const searchStocks = (name) =>
  API.get(`/api/search/${name}`);

export const getHistory = (code, range = "1M") =>
  API.get(`/api/history/${code}?range=${range}`);

export const socket = io(API_URL);