import React from "react";
import { crytoData } from "../../features";
import { CryptoCard } from "../cryptCart/crypto-card.component";

interface crpt {
  cryptoData: object[];
  isError: boolean;
  isLoading: boolean;
}

export const Main = () => {
  const { data: cryptoData, isError, isLoading } = crytoData();

  console.log(cryptoData?.data.data, "data");

  // console.log(isError, "error");
  // console.log(isLoading, "loading");
  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return (
      <div>
        {cryptoData?.data.data.map(item => {
          <CryptoCard cryptoElem={item} />;
        })}
      </div>
    );
  }
};
