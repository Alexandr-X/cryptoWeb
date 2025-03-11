import React from "react";
import { Square } from "../square";
import "./footer.css";
import { ISeacrch } from "../../types";

export const Footer = ({ setIsSearch, setText }: ISeacrch) => {
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
        id={1}
        src={
          "https://banner2.cleanpng.com/20180623/xyp/kisspng-computer-icons-hamburger-button-icon-design-web-ty-bar-icon-5b2e3509141bc1.7405935515297548890824.jpg"
        }
      />
      <input type="text" onChange={event => handleOnSearchChange(event)} />
      <Square
        id={2}
        src={
          "https://as2.ftcdn.net/jpg/02/74/05/81/1000_F_274058177_sKpnAT94o2Gal205KRwbsgVtjmu8wPpe.jpg"
        }
      />
    </div>
  );
};
