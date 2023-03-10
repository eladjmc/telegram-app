import React, { useEffect } from "react";
import { Outlet } from "react-router";
import "./Navbar.scss";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { NavbarButtons } from "../../constants/navbarButtons";
import { useGlobalContext } from "../../context/LoginContext";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  const { isLogged, HandleLogout, currentPage, setNewPage } =
    useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      console.log('im not logged');
      navigate("/login");
    }
  });

  const handleNavLinkPressed = (buttonName: string) => {
    if (buttonName !== NavbarButtons.LOGOUT) {
      setNewPage(buttonName);
      navigate(`/${buttonName.toLowerCase()}`);
    } else {
      HandleLogout();
      navigate("/login");
    }
  };

  return (
    <div className="App">
      <header className="navbar">
        <img src="./assets/images/navbarlogo2.png" height="90%" alt="" />
        <div className="navigate-links">
          <div className="phones">
            <NavButton
              buttonText={NavbarButtons.PHONES}
              action={handleNavLinkPressed}
            />
          </div>
          <div className="groups">
            <NavButton
              buttonText={NavbarButtons.GROUPS}
              action={handleNavLinkPressed}
            />
          </div>
          <div className="activate">
            <NavButton
              buttonText={NavbarButtons.ACTIVATE}
              action={handleNavLinkPressed}
            />
          </div>
        </div>
        <div className="logout">
          <BurgerMenu
            setCurrentPage={setNewPage}
            navigate={navigate}
            currentPage={currentPage}
          />
          <NavButton
            buttonText={NavbarButtons.LOGOUT}
            action={handleNavLinkPressed}
          />
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Navbar;
