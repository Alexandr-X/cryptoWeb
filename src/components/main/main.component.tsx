import React from "react";
import { crytoData } from "../../features";
import { crptItm } from "../../types";
import { CryptoCard } from "../cryptCart/crypto-card.component";
import "./main.style.css";

export const Main = () => {
  const { data: cryptoData, isError, isLoading } = crytoData();

  console.log(cryptoData?.data.data, "data");

  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <div className="crptCont">
      {cryptoData?.data.data.map((item: crptItm) => {
        return (
          <CryptoCard
            id={item.id}
            name={item.name}
            tsupply={item.tsupply}
            price_usd={item.price_usd}
            nameid={item.nameid}
            rank={item.rank}
            percent_change_1h={item.percent_change_1h}
          />
        );
      })}
    </div>
  );
};
