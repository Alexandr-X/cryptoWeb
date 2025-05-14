import axios from "axios";

export const cryptoGraphApi = async (crptName: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${crptName}/market_chart?vs_currency=usd&days=365`
  );
  return response;
};
