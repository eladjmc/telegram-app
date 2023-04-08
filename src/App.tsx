import Navbar from "./components/navbar/Navbar";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const PhonesPage = lazy(() => import("./pages/PhonesPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage"));
const ActivatePage = lazy(() => import("./pages/ActivatePage"));


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <PhonesPage /> },
        { path: "/phones", element: <PhonesPage /> },
        { path: "/groups", element: <GroupsPage /> },
        { path: "/activate", element: <ActivatePage /> },
        { path: "/welcome", element: <PhonesPage /> },
        { path: "*", element: <PhonesPage /> }
      ],
    },
    { path: "/login", element: <LoginPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
