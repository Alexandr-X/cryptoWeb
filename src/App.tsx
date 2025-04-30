import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Footer } from "./components";
import { Main } from "./components";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setText] = useState<string>("");
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [isSortWindow, setIsStoreWindow] = useState<boolean>(false);

  return (
    <>
      <Footer
        setIsSearch={setIsSearch}
        setText={setText}
        setIsStoreWindow={setIsStoreWindow}
        isSortWindow={isSortWindow}
      />
      <QueryClientProvider client={queryClient}>
        <Main
          isSearch={isSearch}
          searchText={searchText}
          isAddToCart={isAddToCart}
          setIsAddToCart={setIsAddToCart}
          isSortWindow={isSortWindow}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
