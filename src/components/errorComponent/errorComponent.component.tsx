import { useEffect, useState } from "react";
import "./errorComponent.style.css";

interface IType {
  type: string;
  el: string;
}

export const ErrorComponent = ({ type, el }: IType) => {
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    if (type == "minLength") {
      if (el == "name") {
        setErrorText(type + " = 3");
      } else if (type == "minLength") {
        setErrorText(type + " = 6");
      }
    } else if (type == "pattern") {
      if (el == "name") {
        setErrorText("you can only use latin letter and number");
      } else if (el == "email") {
        setErrorText(
          "you can only use latin letter and number, you must @ and . after"
        );
      } else {
        setErrorText("you must use _ , number ,Big letter  ");
      }
    }
  }, [type]);
  return (
    <div className="errorCont">
      <p>{errorText}</p>
    </div>
  );
};
