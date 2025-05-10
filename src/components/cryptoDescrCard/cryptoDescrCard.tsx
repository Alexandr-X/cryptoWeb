import { useDispatch, useSelector } from "react-redux";
import "./cryptoDescrCard.css";
import { RootState } from "../../redux";
import { useState } from "react";
import { descrpUpd } from "../../redux/reducers/cryptaDescr";

interface ICryptoDescrCard {
  setIsRightBtnOnCrptCardClick: (value: number) => void;
  isRightBtnOnCrptCardClick: number;
}

export const CryptoDescrCard = ({
  setIsRightBtnOnCrptCardClick,
  isRightBtnOnCrptCardClick,
}: ICryptoDescrCard) => {
  const descrOfCrpt = useSelector((state: RootState) => state.crptDescStore);
  const dispatch = useDispatch();
  const handleOnCryptoDescr = () => {
    setIsRightBtnOnCrptCardClick(-150);
    setTimeout(() => {
      dispatch(
        descrpUpd({
          name: "",
          descr: "",
          logo: "",
          symbol: "",
          first_data_at: "",
        })
      );
    }, 1000);
  };

  return (
    <div
      style={{
        right: `${isRightBtnOnCrptCardClick}rem`,
      }}
      onClick={handleOnCryptoDescr}
      className="descrCont"
    >
      {descrOfCrpt.name !== "" ? (
        <div className="containerOfDescr">
          <img src={descrOfCrpt.logo} alt="crptPict" />
          <div className="descr">
            {" "}
            <h2>
              {descrOfCrpt.name}({descrOfCrpt.symbol})
            </h2>
            <h1>{descrOfCrpt.descr}</h1>
          </div>
          <p>this cryptocurrency was created in {descrOfCrpt.first_data_at}</p>
        </div>
      ) : (
        <img
          className="loadingDescr"
          src="https://media.tenor.com/Lnl8OYUux00AAAAi/baldi-clyde.gif"
          alt=""
        />
      )}
    </div>
  );
};
