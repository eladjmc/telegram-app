import Navbar from "./components/navbar/Navbar";
import PhonesPage from "./pages/PhonesPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GroupsPage from "./pages/GroupsPage";
import ActivatePage from "./pages/ActivatePage";

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
