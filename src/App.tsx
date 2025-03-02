import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Footer } from "./components";
import { Main } from "./components";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setText] = useState<string>("");

  return (
    <>
      <Footer setIsSearch={setIsSearch} setText={setText} />
      <QueryClientProvider client={queryClient}>
        <Main isSearch={isSearch} searchText={searchText} />
      </QueryClientProvider>
    </>
  );
}

export default App;
