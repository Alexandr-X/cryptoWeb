import { useDispatch, useSelector } from "react-redux";
import "./cryptoDescrCard.css";
import { RootState } from "../../redux";
import { descrpUpd } from "../../redux/reducers/cryptaDescr";
import { CryptoGraph } from "../crptoGraph";
import { useCryptoGraphApi } from "../../features";

interface ICryptoDescrCard {
  setIsRightBtnOnCrptCardClick: (value: number) => void;
  isRightBtnOnCrptCardClick: number;
}

export const CryptoDescrCard = ({
  setIsRightBtnOnCrptCardClick,
  isRightBtnOnCrptCardClick,
}: ICryptoDescrCard) => {
  const descrOfCrpt = useSelector((state: RootState) => state.crptDescStore);
  const crptPrettName = descrOfCrpt.name
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
  const { data: graphData } =
    crptPrettName != ""
      ? useCryptoGraphApi(crptPrettName)
      : { data: [{ price: [] }] };

  //       const { data: graphData } = useMemo(()=>{

  // const crptPrettName = descrOfCrpt.name
  //   .toLowerCase()
  //   .split("")
  //   .map((item: string) => {
  //     if (item == " ") {
  //       return "-";
  //     } else if (item !== "") {
  //       return item;
  //     }
  //   })
  //   .join("");
  //    crptPrettName != ""
  //     ? useCryptoGraphApi(crptPrettName)
  //     : { data: [{ price: [] }] };
  // },[descrOfCrpt.name])

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
          <p>
            this cryptocurrency was created in{" "}
            {new Date(descrOfCrpt.first_data_at).toLocaleDateString("ru-RU")}
          </p>
          <CryptoGraph arr={graphData?.data.prices} />
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
