import axios from "axios";

export const descrApi = async (crptName: string) => {
  const response = await axios.get(
    `https://api.coinpaprika.com/v1/coins/${crptName}`
  );
  return response;
};
