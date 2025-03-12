import React from "react";
import { crptItm } from "../../types";

export const CartsCryptoCard = ({
  id,
  name,
  tsupply,
  price_usd,
  nameid,
  rank,
  percent_change_1h,
}: crptItm) => {
  return <div>{name}</div>;
};
