import { JSX } from "react/jsx-runtime";

export interface crptItm {
  id: string;
  tsupply: string;
  name: string;
  nameid: string;
  percent_change_1h: string;
  price_usd: string;
  rank: number;
  setIsAddToCart: (value: boolean) => void;
  setTop: (value: number) => void;
}
