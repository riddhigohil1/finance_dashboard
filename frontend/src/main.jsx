import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { HeadProvider } from "react-head";

createRoot(document.getElementById("root")).render(
  <HeadProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </HeadProvider>
);
