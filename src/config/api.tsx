import axios from "axios";

export const api = async () => {
  const response = await axios.get(
    "https://api.coinlore.net/api/tickers/?start=100&limit=100"
  );
  return response;
};
