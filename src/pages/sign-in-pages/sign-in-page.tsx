import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CryptoList } from "../../components";
import { crptItm } from "../../types";

export function SignInPages() {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  return (
    <div>
      {location.state.data.map((item: crptItm) => {
        return <h1>{item.name}</h1>;
      })}
    </div>
  );
}
