import { useQuery } from "@tanstack/react-query";
import { api } from "../../config";

export const useCryptoData = (start:number,limit:number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({ queryKey: ["crypta"], queryFn: ()=> api(start,limit)} );
};
