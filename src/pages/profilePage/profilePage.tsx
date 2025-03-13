import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { crptItm } from "../../types";
import { CartsCryptoCard } from "../../components";

export function ProfilePage() {
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("arrOfData")) {
      console.log("asd");
      localStorage.setItem("arrOfData", JSON.stringify(location.state.data));
    } else {
      let temp = JSON.parse(localStorage.getItem("arrOfData") || "[]");
      temp.push(...location.state.data);
      console.log(temp, "temp");
      localStorage.setItem("arrOfData", JSON.stringify(temp));

      // for (let i = 0; i < temp.length; i++) {
      //   let arr = [];
      //   for (let j = 0; j < temp.length; j++) {
      //     if (temp[i] === temp[j]) {
      //       arr.push(j);
      //     }
      //   }

      // }
    }
  }, [location.state.data]);

  return (
    <div>
      {location.state.data.map((item: crptItm) => {
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
