import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { ProfilePage } from "./pages/index.ts";
import { TopUpPage } from "./pages/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page2" element={<ProfilePage />} />
        <Route path="/topUPpage" element={<TopUpPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
