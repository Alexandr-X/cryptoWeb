import axios from "axios";

export const descrApi = async (crptName: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${crptName}`
  );
  return response;
};
