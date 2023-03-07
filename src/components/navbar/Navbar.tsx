import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router";
import "./Navbar.scss";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { NavbarButtons } from "../../constants/navbarButtons";
import { useGlobalContext } from "../../context/LoginContext";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState<string>("phones");

  const { isLogged, HandleLogout } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  });

  const handleNavLinkPressed = (buttonName: string) => {
    if (buttonName !== NavbarButtons.LOGOUT) {
      setCurrentPage(buttonName);
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
              currentPage={currentPage}
            />
          </div>
          <div className="groups">
            <NavButton
              buttonText={NavbarButtons.GROUPS}
              action={handleNavLinkPressed}
              currentPage={currentPage}
            />
          </div>
          <div className="activate">
            <NavButton
              buttonText={NavbarButtons.ACTIVATE}
              action={handleNavLinkPressed}
              currentPage={currentPage}
            />
          </div>
        </div>
        <div className="logout">
          <BurgerMenu/>
          <NavButton
            buttonText={NavbarButtons.LOGOUT}
            action={handleNavLinkPressed}
            currentPage={currentPage}
          />
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Navbar;
