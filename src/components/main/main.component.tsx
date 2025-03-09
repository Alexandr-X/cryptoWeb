import React, { useEffect, useMemo, useState } from "react";
import { useCryptoData } from "../../features";
import { crptItm } from "../../types";
import { CryptoCard } from "../cryptCart/crypto-card.component";
import "./main.style.css";

interface ISearchValue {
  isSearch: boolean;
  searchText: string;
  isAddToCart: boolean;
  setIsAddToCart: (value: boolean) => void;
}

export const Main = ({
  isSearch,
  searchText,
  isAddToCart,
  setIsAddToCart,
}: ISearchValue) => {
  const [start, setStartVal] = useState<number>(1);
  const [limit, setlimitVal] = useState<number>(6);
  const { data: cryptoData, isError, isLoading } = useCryptoData(start, limit);
  const [height, setHeight] = useState(0);

  //console.log(cryptoData?.data.data, "data");
  //console.log("is - ", isSearch, " val - ", searchText);

  const filteredCryptoData = useMemo(() => {
    console.log(cryptoData?.data.data);
    return isSearch
      ? cryptoData?.data.data.filter(
          (item: crptItm) =>
            item.name.includes(searchText) || item.nameid.includes(searchText)
        )
      : cryptoData?.data.data;
  }, [cryptoData, limit, searchText]);

  const handleOnButtonClick = () => {
    setlimitVal(limit + 6);
    setHeight(height + 80);
  };
  useEffect(() => {
    if (!filteredCryptoData) {
      setHeight(0);
    } else if (filteredCryptoData.length < 6) setHeight(80);
    else {
      console.log(height, "1asdasd");
      setHeight((parseInt(filteredCryptoData.length) / 6) * 80);
    }
  }, [filteredCryptoData?.length]);

  console.log(height);
  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div
      className="container"
      style={{
        height: `${height}%`,
      }}
    >
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
            />
          );
        })}
      </div>
      {!isSearch ? (
        <div className="add6words" onClick={handleOnButtonClick}>
          {" "}
          add six more words
        </div>
      ) : (
        <h2>This is what we find</h2>
      )}
      {isAddToCart ? <div className="Notif">crpta was adding</div> : ""}
    </div>
  );
};
