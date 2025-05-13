// import axios from "axios";

// export const cryptoGraphApi = async (crptName: string) => {
//   if (crptName != "") {
//     const response = await axios.get(
//       `https://api.coingecko.com/api/v3/coins/${crptName}/market_chart?vs_currency=usd&days=365`
//     );
//     return response;
//   }
// };
import axios from "axios";

export const cryptoGraphApi = async (crptName: string) => {
  if (!crptName) {
    // Если криптовалюта не указана, выбрасываем ошибку.
    throw new Error("Не указано имя криптовалюты");
  }
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${crptName}/market_chart?vs_currency=usd&days=365`
  );
  return response.data; // Возвращаем только данные, а не весь объект axios.Response
};
