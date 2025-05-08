import axios from "axios";

export const api = async (limit: number) => {
  const response = await axios.get(
    `https://api.coinlore.net/api/tickers/?start=0&limit=${limit}`
  );
  return response;
};
