import { useQuery } from "@tanstack/react-query";
import { api } from "../../config";

interface crypta {
  cryptoData: object;
  isError: boolean;
  isLoading: boolean;
}

export const crytoData = () => {
  return useQuery({ queryKey: ["crypta"], queryFn: api });
};
