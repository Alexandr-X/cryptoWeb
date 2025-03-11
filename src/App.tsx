import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Footer } from "./components";
import { Main } from "./components";
import { useState } from "react";
import { useSearchParams } from "react-router";

const queryClient = new QueryClient();

function App() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setText] = useState<string>("");
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  return (
    <>
      <Footer setIsSearch={setIsSearch} setText={setText} />
      <QueryClientProvider client={queryClient}>
        <Main
          isSearch={isSearch}
          searchText={searchText}
          isAddToCart={isAddToCart}
          setIsAddToCart={setIsAddToCart}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
