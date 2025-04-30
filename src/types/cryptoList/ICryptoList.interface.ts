import { crptItm } from "../cardType";

export interface ICryptoList {
  filteredCryptoData: crptItm[];
  setIsAddToCart: (value: boolean) => void;
  setTop: (value: number) => void;
}
