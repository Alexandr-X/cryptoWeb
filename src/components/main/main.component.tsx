import React, { useEffect, useMemo, useState } from "react";
import { useCryptoData } from "../../features";
import { crptItm } from "../../types";
import "./main.style.css";
import { CryptoList } from "../cryptoList";
import { CryptoDescrCard } from "../cryptoDescrCard";

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
  const { data: cryptoData, isError, isLoading } = useCryptoData(limit);
  const [height, setHeight] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(-20);
  const [fromCost, setFromCost] = useState<string>("");
  const [toCost, setToCost] = useState<string>("");
  const [isFindBtnClick, setIsFindBtnClick] = useState<boolean>(false);
  const [findBtnText, setFindBtnText] = useState<string>("find");
  const { data: serchCrptData } = useCryptoData(200);
  const [right, setRight] = useState<number>(-3);
  const [isRightBtnOnCrptCardClick, setIsRightBtnOnCrptCardClick] =
    useState<number>(-150);
  const [isFirstInpCheked, setIsFirstInpCheked] = useState<boolean>(false);
  const [isSecondInpCheked, setIsSecondInpCheked] = useState<boolean>(false);

  const handleOnAddNew6CrptButtonClick = () => {
    setlimitVal(limit + 6);
    setIsSecondInpCheked(false);
    setIsFirstInpCheked(false);
  };

  const handleOnBack6WordsBtnClick = () => {
    setlimitVal(6);
    setIsSecondInpCheked(false);
    setIsFirstInpCheked(false);
  };

  const handleOnInpCostChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.className == "frm") setFromCost(event.target.value);
    else if (event.target.className == "to") setToCost(event.target.value);
  };

  const handleOnFindBtnClick = () => {
    if (!isFindBtnClick) {
      if (
        (fromCost == "" && toCost != "") ||
        (fromCost != "" && toCost == "") ||
        (fromCost != "" && toCost != "")
      ) {
        setIsFindBtnClick(true);
      } else {
        setIsFindBtnClick(false);
      }
    } else {
      setIsFindBtnClick(false);
    }
    setFindBtnText(isFindBtnClick ? "find" : "back");
  };
  const handleOnToTopBtnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hadleOnFromMinSortInputChange = () => {
    setIsFirstInpCheked(!isFirstInpCheked);
  };

  const hadleOnToMinSortInputChange = () => {
    setIsSecondInpCheked(!isSecondInpCheked);
  };

  const filteredCryptoData = useMemo(() => {
    return isSearch
      ? serchCrptData?.data.data.filter((item: crptItm) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : isFindBtnClick
      ? cryptoData?.data.data.filter((item: crptItm) => {
          if (fromCost !== "" && toCost !== "") {
            return (
              Number(item.price_usd) >= Number(fromCost) &&
              Number(item.price_usd) <= Number(toCost)
            );
          } else if (fromCost == "" && toCost !== "") {
            return Number(item.price_usd) <= Number(toCost);
          } else if (fromCost !== "" && toCost == "") {
            return Number(item.price_usd) >= Number(fromCost);
          }
        })
      : cryptoData?.data.data;
  }, [cryptoData, limit, searchText, isFindBtnClick]);

  const priceSortArr = useMemo(() => {
    if (isSecondInpCheked && isFirstInpCheked) {
      setIsSecondInpCheked(false);
      setIsFirstInpCheked(false);
    } else {
      if (isFirstInpCheked) {
        return filteredCryptoData.toSorted((x: crptItm, y: crptItm) => {
          return Number(x.price_usd) - Number(y.price_usd);
        });
      }

      if (isSecondInpCheked) {
        return filteredCryptoData
          .toSorted((x: crptItm, y: crptItm) => {
            return Number(x.price_usd) - Number(y.price_usd);
          })
          .toReversed();
      }
    }
  }, [isFirstInpCheked, isSecondInpCheked]);

  useEffect(() => {
    if (!filteredCryptoData) {
      setHeight(0);
      setRight(-3);
    } else if (filteredCryptoData.length <= 6) {
      setHeight(80);
      setRight(-3);
    } else {
      setRight(1);
      setHeight((parseInt(filteredCryptoData.length) / 6) * 80);
      if (parseInt(filteredCryptoData.length) % 6 !== 0) {
        setHeight((height) => height + 80);
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
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
        alt=""
      />
    );
  }

  return (
    <div
      className="container"
      style={{
        height: `${height}%`,
      }}
    >
      <CryptoList
        filteredCryptoData={
          !isFirstInpCheked && !isSecondInpCheked
            ? filteredCryptoData
            : priceSortArr
        }
        setIsAddToCart={setIsAddToCart}
        setTop={setTop}
        setIsRightBtnOnCrptCardClick={setIsRightBtnOnCrptCardClick}
      />

      {!isSearch ? (
        <div className="changeQuntityBtnsCont">
          <div className="add6words" onClick={handleOnAddNew6CrptButtonClick}>
            {" "}
            add 6 more crpta
          </div>
          <div className="add6words" onClick={handleOnBack6WordsBtnClick}>
            back only 6 crpta
          </div>
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
      {isRightBtnOnCrptCardClick ? (
        <CryptoDescrCard
          setIsRightBtnOnCrptCardClick={setIsRightBtnOnCrptCardClick}
          isRightBtnOnCrptCardClick={isRightBtnOnCrptCardClick}
        />
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

        <div className="sortFromCont">
          <label htmlFor="fromMin">sort from min to max</label>
          <input
            type="checkbox"
            id="fromMin"
            onChange={hadleOnFromMinSortInputChange}
            checked={isFirstInpCheked}
          />
        </div>

        <div className="sortFromCont">
          <label htmlFor="fromMax">sort from max to min</label>
          <input
            type="checkbox"
            id="fromMax"
            onChange={hadleOnToMinSortInputChange}
            checked={isSecondInpCheked}
          />
        </div>
      </div>

      <div
        className="goOnTop"
        onClick={handleOnToTopBtnClick}
        style={{ right: `${right}rem` }}
      >
        <img
          src="https://img.freepik.com/premium-vector/vector-design-up-chevron-icon-style_1134108-88901.jpg?ga=GA1.1.539172598.1740419676&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
    </div>
  );
};
