import React from "react";
import { useState } from "react";
import { Outlet } from "react-router";
import "../../styles/Navbar.scss";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { NavbarButtons } from "../../constants/navbarButtons";



const Navbar = () => {
  const [currentPage, setCurrentPage] = useState<string>("Phones");

  const navigate = useNavigate();

  const handleNavLinkPressed = (buttonName: string) => {
    if (buttonName !== NavbarButtons.LOGOUT) {
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
