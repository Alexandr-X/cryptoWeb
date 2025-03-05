import axios from "axios";

export const api = async (start: number, limit: number) => {
  const response = await axios.get(
    `https://api.coinlore.net/api/tickers/?start=${start}&limit=${limit}`
  );
  return response;
};
