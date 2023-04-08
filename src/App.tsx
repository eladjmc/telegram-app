import Navbar from "./components/navbar/Navbar";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {RequireAuth, useIsAuthenticated} from "react-auth-kit";
import { Pages } from "./context/LoginContext";

const PhonesPage = lazy(() => import("./pages/PhonesPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage"));
const ActivatePage = lazy(() => import("./pages/ActivatePage"));

function App() {

  const PrivateRoute = ({ Component }: { Component: any }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to={`/${Pages.LOGIN}`} />;
  };
  
  return (
    <Routes>
      <Route path={`/${Pages.LOGIN}`} element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute Component={Navbar} />
        }
      >
        <Route path={`/${Pages.PHONES}`} element={<PhonesPage />} />
        <Route path={`/${Pages.GROUPS}`} element={<GroupsPage />} />
        <Route path={`/${Pages.ACTIVATE}`} element={<ActivatePage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
