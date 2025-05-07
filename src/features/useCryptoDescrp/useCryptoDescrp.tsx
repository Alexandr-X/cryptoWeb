import { useQuery } from "@tanstack/react-query";
import { descrApi } from "../../config/descrApi";

export const useCryptoDescrp = (cryptaName: string) => {
  return useQuery({
    queryKey: ["descr", cryptaName],
    queryFn: () => descrApi(cryptaName),
  });
};
