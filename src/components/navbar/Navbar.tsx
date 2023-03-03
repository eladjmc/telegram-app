import React from "react";
import { useState } from "react";
import { Outlet } from "react-router";
import "../../styles/Navbar.scss";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { navbarButtons } from "../../constants/navbarButtons";

const [phones, groups, activate, logout] = navbarButtons;

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState<string>("Phones");

  const navigate = useNavigate();

  const handleNavLinkPressed = (buttonName: string) => {
    if (buttonName !== logout) {
      setCurrentPage(buttonName);
      navigate(`/${buttonName.toLowerCase()}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="App">
      <header className="navbar">
        <div className="logo"></div>
        <div className="navigate-links">
          <div className="phones">
            <NavButton
              buttonText={phones}
              action={handleNavLinkPressed}
              currentPage={currentPage}
            />
          </div>
          <div className="groups">
            <NavButton
              buttonText={groups}
              action={handleNavLinkPressed}
              currentPage={currentPage}
            />
          </div>
          <div className="activate">
            <NavButton
              buttonText={activate}
              action={handleNavLinkPressed}
              currentPage={currentPage}
            />
          </div>
        </div>
        <div className="logout">
          <NavButton
            buttonText={logout}
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
