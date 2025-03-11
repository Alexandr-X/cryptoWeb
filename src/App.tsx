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
  const [arrOfCartsCrypta, setArrOfCartsCrypta] = useState<crptItm[]>([]);

  return (
    <>
      <Footer
        setIsSearch={setIsSearch}
        setText={setText}
        arrOfCartsCrypta={arrOfCartsCrypta}
      />
      <QueryClientProvider client={queryClient}>
        <Main
          isSearch={isSearch}
          searchText={searchText}
          isAddToCart={isAddToCart}
          setIsAddToCart={setIsAddToCart}
          setArrOfCartsCrypta={setArrOfCartsCrypta}
          arrOfCartsCrypta={arrOfCartsCrypta}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
