import { crptItm } from "../cardType";
export interface ISeacrch {
  setIsSearch: (value: boolean) => void;
  setText: (value: string) => void;
  arrOfCartsCrypta: crptItm[];
}
