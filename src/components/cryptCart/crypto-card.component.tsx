export const CryptoCard = ({ cryptoElem }) => {
  return (
    <div>
      <h2>{cryptoElem.name}</h2>
      <p>{cryptoElem.msupply}</p>
      <span>{cryptoElem.price_usd}</span>
    </div>
  );
};
