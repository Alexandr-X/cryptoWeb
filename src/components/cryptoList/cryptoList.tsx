
import { crptItm } from "../../types";
import { CryptoCard } from "../cryptCart/crypto-card.component";
import { ICryptoList } from "../../types/cryptoList/ICryptoList.interface";

export const CryptoList = ({
  filteredCryptoData,
  setIsAddToCart,
  setTop,
  setArrOfCartsCrypta,
  arrOfCartsCrypta,
}: ICryptoList) => {
  return (
    <div className="crptCont">
      {filteredCryptoData?.map((item: crptItm) => {
        return (
          <CryptoCard
            key={item.id}
            id={item.id}
            name={item.name}
            price_usd={item.price_usd}
            percent_change_1h={item.percent_change_1h}
            setIsAddToCart={setIsAddToCart}
            setTop={setTop}
            item={item}
            setArrOfCartsCrypta={setArrOfCartsCrypta}
            arrOfCartsCrypta={arrOfCartsCrypta}
          />
        );
      })}
    </div>
  );
};
