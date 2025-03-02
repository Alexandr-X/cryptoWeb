import axios from "axios";

export const api = async () => {
  const response = await axios.get(
    "https://api.coinlore.net/api/tickers/?start=1&limit=6"
  );
  return response;
};
