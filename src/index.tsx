import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/shared/reset.scss";
import "./styles/shared/style.scss";
import App from "./App";
import {LoginProvider} from "./context/LoginContext";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {AuthProvider} from "react-auth-kit";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginProvider>
      <DevSupport ComponentPreviews={ComponentPreviews}
                  useInitialHook={useInitial}
      >
        <AuthProvider
          authType="cookie"
          authName={"token"}
          cookieSecure={false}
          cookieDomain={window.location.hostname}
        >
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </AuthProvider>
      </DevSupport>
    </LoginProvider>
  </React.StrictMode>
);
