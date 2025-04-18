import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Footer } from "./components";
import { Main } from "./components";
import { useState } from "react";
import { crptItm } from "./types";

const queryClient = new QueryClient();

function App() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setText] = useState<string>("");
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [arrOfCartsCrypta, setArrOfCartsCrypta] = useState<crptItm[]>(
    JSON.parse(localStorage.getItem("arrOfData") || "[]")
  );
  const [isSortWindow, setIsStoreWindow] = useState<boolean>(false);

  if (!localStorage.getItem("wallet")) {
    localStorage.setItem("wallet", "100");
  }
  if (!localStorage.getItem("boughts")) {
    localStorage.setItem("boughts", "[]");
  }

  return (
    <>
      <Footer
        setIsSearch={setIsSearch}
        setText={setText}
        arrOfCartsCrypta={arrOfCartsCrypta}
        setIsStoreWindow={setIsStoreWindow}
        isSortWindow={isSortWindow}
      />
      <QueryClientProvider client={queryClient}>
        <Main
          isSearch={isSearch}
          searchText={searchText}
          isAddToCart={isAddToCart}
          setIsAddToCart={setIsAddToCart}
          setArrOfCartsCrypta={setArrOfCartsCrypta}
          arrOfCartsCrypta={arrOfCartsCrypta}
          isSortWindow={isSortWindow}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
