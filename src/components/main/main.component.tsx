import React, { useEffect, useState } from "react";
import { crytoData } from "../../features";
import { crptItm } from "../../types";
import { CryptoCard } from "../cryptCart/crypto-card.component";
import "./main.style.css";

interface ISearchValue {
  isSearch: boolean;
  searchText: string;
}

export const Main = ({ isSearch, searchText }: ISearchValue) => {
  const { data: cryptoData, isError, isLoading } = crytoData();
  const [searchArr, setSearch] = useState();

  useEffect(() => {
    console.log(cryptoData?.data.data, "data");
    console.log("is - ", isSearch, " val - ", searchText);
    setSearch(
      cryptoData?.data.data.filter(
        (item: crptItm) =>
          item.name.includes(searchText) || item.nameid.includes(searchText)
      )
    );
    console.log(searchArr, "search el");
  }, [searchText]);

  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  if (!isSearch) {
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
  }

  return (
    <div className="crptCont">
      {searchArr?.map((item: crptItm) => {
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
