import Navbar from "./components/navbar/Navbar";
import PhonesPage from './pages/PhonesPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/phones", element: <PhonesPage/>} ,
        
        { path: "/*", element: <LoginPage /> }, // need to make no such page category
      ],
      
    },
    { path: "/login", element: <LoginPage /> },
  ]);
  return <RouterProvider router={router} />
}

export default App;
