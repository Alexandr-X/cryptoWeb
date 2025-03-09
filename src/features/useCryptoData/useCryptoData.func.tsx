import { useQuery } from "@tanstack/react-query";
import { api } from "../../config";

export const useCryptoData = (start: number, limit: number) => {
  return useQuery({
    queryKey: ["crypta", limit],
    queryFn: () => api(start, limit),
  });
};
