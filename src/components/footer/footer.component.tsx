import React from "react";
import { Square } from "../square";
import "./footer.css";
import { ISeacrch } from "../../types";

interface IFooter extends ISeacrch {
  setIsStoreWindow: (val: boolean) => void;
  isSortWindow:boolean;
}
export const Footer = ({ setIsSearch, setText, arrOfCartsCrypta ,setIsStoreWindow,isSortWindow}: IFooter) => {
  const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setIsSearch(true);
      setText(event.target.value);
    } else {
      setIsSearch(false);
      setText("");
    }
  };



  return (
    <div className="mainCont">
      <Square
        arrOfCartsCrypta={arrOfCartsCrypta}
        id={1}
        
        src={
          "https://banner2.cleanpng.com/20180623/xyp/kisspng-computer-icons-hamburger-button-icon-design-web-ty-bar-icon-5b2e3509141bc1.7405935515297548890824.jpg"
        }
        setIsStoreWindow={setIsStoreWindow}
        isSortWindow={isSortWindow}
      />
      <input type="text" onChange={(event) => handleOnSearchChange(event)} />
      <Square 
        arrOfCartsCrypta={arrOfCartsCrypta}
        id={2}
        setIsStoreWindow={setIsStoreWindow}
        src={
          "https://as2.ftcdn.net/jpg/02/74/05/81/1000_F_274058177_sKpnAT94o2Gal205KRwbsgVtjmu8wPpe.jpg"
        }
      />
    </div>
  );
};
