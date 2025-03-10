import React from "react";
import { crptItm } from "../../types";
import { CryptoCard } from "../cryptCart/crypto-card.component";
import { ICryptoList } from "../../types/cryptoList/ICryptoList.interface";

export const CryptoList = ({
  filteredCryptoData,
  setIsAddToCart,
  setTop,
}: ICryptoList) => {
  return (
    <div className="crptCont">
      {filteredCryptoData?.map((item: crptItm) => {
        return (
          <CryptoCard
            key={item.id}
            id={item.id}
            name={item.name}
            tsupply={item.tsupply}
            price_usd={item.price_usd}
            nameid={item.nameid}
            rank={item.rank}
            percent_change_1h={item.percent_change_1h}
            setIsAddToCart={setIsAddToCart}
            setTop={setTop}
          />
        );
      })}
    </div>
  );
};
