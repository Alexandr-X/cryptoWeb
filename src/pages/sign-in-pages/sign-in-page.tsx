import React, { useState } from "react";
import { useNavigate } from "react-router";

export function SignInPages() {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleOnSignInButtonClick = () => {
    navigate("/main");
  };
  return (
    <div>
      <div>
        <input type="text" />
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button onClick={handleOnSignInButtonClick}>Sign In</button>
    </div>
  );
}
