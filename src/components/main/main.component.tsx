import React, { useEffect, useMemo, useState } from "react";
import { useCryptoData } from "../../features";
import { crptItm } from "../../types";
import "./main.style.css";
import { CryptoList } from "../cryptoList";

interface ISearchValue {
  isSearch: boolean;
  searchText: string;
  isAddToCart: boolean;
  setIsAddToCart: (value: boolean) => void;
  isSortWindow: boolean;
}

export const Main = ({
  isSearch,
  searchText,
  isAddToCart,
  setIsAddToCart,
  isSortWindow,
}: ISearchValue) => {
  const [limit, setlimitVal] = useState<number>(6);
  const { data: cryptoData, isError, isLoading } = useCryptoData(0, limit);
  const [height, setHeight] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(-20);
  const [fromCost, setFromCost] = useState<string>("");
  const [toCost, setToCost] = useState<string>("");
  const [isFindBtnClick, setIsFindBtnClick] = useState<boolean>(false);
  const [findBtnText, setFindBtnText] = useState<string>("find");

  const handleOnButtonClick = () => {
    setlimitVal(limit + 6);
    setHeight(height + 80);
  };

  const handleOnInpCostChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.className == "frm") setFromCost(event.target.value);
    else if (event.target.className == "to") setToCost(event.target.value);
  };

  const handleOnFindBtnClick = () => {
    if (fromCost == "" && toCost == "" && !isFindBtnClick) console.log("");
    else setIsFindBtnClick(!isFindBtnClick);

    setFindBtnText(isFindBtnClick ? "find" : "back");
    console.log(findBtnText);
  };

  const filteredCryptoData = useMemo(() => {
    return !isFindBtnClick
      ? isSearch
        ? cryptoData?.data.data.filter(
            (item: crptItm) => item.name.includes(searchText) //|| item.nameid.includes(searchText)
          )
        : cryptoData?.data.data
      : cryptoData?.data.data.filter(
          (item: crptItm) =>
            Number(item.price_usd) >= Number(fromCost) &&
            Number(item.price_usd) <= Number(toCost)
        );
  }, [cryptoData, limit, searchText, isFindBtnClick]);

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

  useEffect(() => {
    setLeft(isSortWindow ? 1 : -20);
  }, [isSortWindow]);
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

      <div className="sortCont" style={{ left: `${left}rem` }}>
        <div className="sortInpCont">
          {" "}
          <input
            value={fromCost}
            type="text"
            placeholder="from"
            className="frm"
            onChange={handleOnInpCostChange}
          />
          <input
            value={toCost}
            type="text"
            placeholder="to"
            className="to"
            onChange={handleOnInpCostChange}
          />
        </div>

        <div className="findBtn" onClick={handleOnFindBtnClick}>
          {findBtnText}
          <div className="aft"></div>
        </div>
      </div>
    </div>
  );
};
