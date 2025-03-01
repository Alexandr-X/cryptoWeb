import { useQuery } from "@tanstack/react-query";
import { api } from "../../config";

export const crytoData = () => {
  return useQuery({ queryKey: ["crypta"], queryFn: api });
};
