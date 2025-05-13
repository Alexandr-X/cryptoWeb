import { useQuery } from "@tanstack/react-query";
import { cryptoGraphApi } from "../../config";

export const useCryptoGraphApi = (crptName: string) => {
  return useQuery({
    queryKey: ["graph"],
    queryFn: () => cryptoGraphApi(crptName),
  });
};
