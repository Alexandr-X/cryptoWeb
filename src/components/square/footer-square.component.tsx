import "./square.style.css";
import { NavLink } from "react-router";

type sqrType = {
  src: string;
  id: number;
  setIsStoreWindow: (val: boolean) => void;
  isSortWindow: boolean;
};

export const Square = ({
  src,
  id,
  setIsStoreWindow,
  isSortWindow,
}: sqrType) => {
  const onClickTest = () => {
    if (id === 1) {
      setIsStoreWindow(!isSortWindow);
    }
  };
  return id === 2 ? (
    <NavLink onClick={onClickTest} to={"/page2"} className="imgCont">
      <img src={src} className="image" />
    </NavLink>
  ) : (
    <div onClick={onClickTest} className="imgCont">
      <img src={src} className="image" />
    </div>
  );
};
