import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/shared/reset.scss";
import "./styles/shared/style.scss";
import App from "./App";
import { LoginProvider } from "./context/LoginContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);
