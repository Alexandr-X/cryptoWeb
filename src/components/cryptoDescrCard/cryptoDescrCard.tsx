import { useDispatch, useSelector } from "react-redux";
import "./cryptoDescrCard.css";
import { RootState } from "../../redux";
import { descrpUpd } from "../../redux/reducers/cryptaDescr";
import { useMemo } from "react";
import { useCryptoGraphApi } from "../../features";
import { CryptoGraph } from "../crptoGraph";

interface ICryptoDescrCard {
  setIsRightBtnOnCrptCardClick: (value: number) => void;
  isRightBtnOnCrptCardClick: number;
}

export const CryptoDescrCard = ({
  setIsRightBtnOnCrptCardClick,
  isRightBtnOnCrptCardClick,
}: ICryptoDescrCard) => {
  const descrOfCrpt = useSelector((state: RootState) => state.crptDescStore);
  const crptname = useMemo(() => {
    return descrOfCrpt.name
      .toLowerCase()
      .split("")
      .map((item: string) => {
        if (item == " ") {
          return "-";
        } else if (item !== "") {
          return item;
        }
      })
      .join("");
  }, [descrOfCrpt.name]);

  const { data: graphData } = useCryptoGraphApi(crptname);

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
            <h1>
              {descrOfCrpt.name}({descrOfCrpt.symbol})
            </h1>
            <p className="descrOfCrpt">
              {descrOfCrpt.descr
                ? descrOfCrpt.descr
                : "we havent got describing about this cryptocurrency  sorry about it("}
            </p>
          </div>
          <h2 className="dateofcreat">
            this cryptocurrency was created -{" "}
            {new Date(descrOfCrpt.first_data_at).toLocaleDateString("ru-RU")}
          </h2>

          {graphData?.data.prices ? (
            <CryptoGraph arr={graphData?.data.prices} />
          ) : (
            <h1>We havent got data about this crptacurrency</h1>
          )}
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
