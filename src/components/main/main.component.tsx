import React, { useEffect, useMemo, useState } from "react";
import { useCryptoData } from "../../features";
import { crptItm } from "../../types";
import { CryptoCard } from "../cryptCart/crypto-card.component";
import "./main.style.css";

interface ISearchValue {
  isSearch: boolean;
  searchText: string;
}

export const Main = ({ isSearch, searchText }: ISearchValue) => {
  const [start, setStartVal] = useState<number>(1);
  const [limit, setlimitVal] = useState<number>(6);
  const { data: cryptoData, isError, isLoading } = useCryptoData(start, limit);

  console.log(cryptoData?.data.data, "data");
  console.log("is - ", isSearch, " val - ", searchText);

  const filteredCryptoData = useMemo(
    () =>
      isSearch
        ? cryptoData?.data.data.filter(
            (item: crptItm) =>
              item.name.includes(searchText) || item.nameid.includes(searchText)
          )
        : cryptoData?.data.data,
    []
  );

  const handleOnButtonClick = () => {
    console.log(123);
    //const { data: cryptoData, isError, isLoading } = useCryptoData(1, 12);
  };

  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div className="container">
      <div className="crptCont">
        {filteredCryptoData?.map((item: crptItm) => {
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
      <div className="add6words" onClick={handleOnButtonClick}>
        {" "}
        add six more words
      </div>
    </div>
  );
};
