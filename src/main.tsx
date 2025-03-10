import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { SignInPages } from "./pages/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<App />} />
        <Route path="/sign-in" element={<SignInPages />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
