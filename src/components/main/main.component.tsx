import React, { useEffect, useMemo, useState } from "react";
import { useCryptoData } from "../../features";
import { crptItm } from "../../types";
import { CryptoCard } from "../cryptCart/crypto-card.component";
import "./main.style.css";
import { CryptoList } from "../cryptoList";

interface ISearchValue {
  isSearch: boolean;
  searchText: string;
  isAddToCart: boolean;
  setIsAddToCart: (value: boolean) => void;
  setArrOfCartsCrypta: (arr: crptItm[]) => void;
  arrOfCartsCrypta: crptItm[];
}

export const Main = ({
  isSearch,
  searchText,
  isAddToCart,
  setIsAddToCart,
  setArrOfCartsCrypta,
  arrOfCartsCrypta,
}: ISearchValue) => {
  const [start, setStartVal] = useState<number>(0);
  const [limit, setlimitVal] = useState<number>(6);
  const { data: cryptoData, isError, isLoading } = useCryptoData(start, limit);
  const [height, setHeight] = useState<number>(0);
  const [top, setTop] = useState<number>(0);

  const filteredCryptoData = useMemo(() => {
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
    } else if (filteredCryptoData.length < 6) {
      setHeight(80);
    } else {
      setHeight((parseInt(filteredCryptoData.length) / 6) * 80);
      if (parseInt(filteredCryptoData.length) % 6 !== 0) {
        setHeight(height => height + 80);
      }
    }
  }, [filteredCryptoData?.length]);

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
      <CryptoList
        filteredCryptoData={filteredCryptoData}
        setIsAddToCart={setIsAddToCart}
        setTop={setTop}
        setArrOfCartsCrypta={setArrOfCartsCrypta}
        arrOfCartsCrypta={arrOfCartsCrypta}
      />
      {!isSearch ? (
        <div className="add6words" onClick={handleOnButtonClick}>
          {" "}
          add six more words
        </div>
      ) : (
        <h2>This is what we find</h2>
      )}

      {isAddToCart ? (
        <div style={{ top: `${top}px` }} className="Notif">
          crpta was adding
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
