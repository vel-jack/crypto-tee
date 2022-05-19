import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TeeContextProvider } from "./context/TeeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TeeContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TeeContextProvider>
);
