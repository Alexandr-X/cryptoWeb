import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { crptItm } from "../../types";
import { CartsCryptoCard } from "../../components";

export function ProfilePage() {
  const location = useLocation();
  const [arrOfClickedElem, setArrOfClickedElem] = useState<crptItm[]>(
    location.state.data
  );

  useEffect(() => {
    if (!localStorage.getItem("arrOfData")) {
      console.log("asd");
      localStorage.setItem("arrOfData", JSON.stringify(location.state.data));
    } else {
      let temp = JSON.parse(localStorage.getItem("arrOfData") || "[]");

      // if (!Array.isArray(temp)) {
      //   temp = []; // Если нет, инициализируем его как пустой массив
      // }

      temp.push(...location.state.data);

      temp = Array.from(
        new Set(temp.map((item: crptItm) => JSON.stringify(item)))
      ).map(item => JSON.parse(item));

      setArrOfClickedElem(temp);

      console.log(temp, "temp");
      localStorage.setItem("arrOfData", JSON.stringify(temp));
    }
  }, [location.state.data]);

  return (
    <div>
      {arrOfClickedElem.map((item: crptItm) => {
        return (
          <CartsCryptoCard
            key={item.id}
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
