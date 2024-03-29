import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router";
import "./Navbar.scss";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { NavbarButtons } from "../../constants/navbarButtons";
import { Pages, useGlobalContext } from "../../context/LoginContext";
import BurgerMenu from "./BurgerMenu";
import { LinearProgress } from "@mui/material";
import { useSignOut } from "react-auth-kit";

const Navbar = () => {
  const { currentPage, setNewPage } = useGlobalContext();

  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleNavLinkPressed = (buttonName: string) => {
    const page = buttonName.toLowerCase() as Pages;
    if (page !== NavbarButtons.LOGOUT.toLowerCase()) {
      setNewPage(page);
      navigate(`/${buttonName.toLowerCase()}`);
    } else {
      signOut();
      navigate(`/${Pages.LOGIN}`);
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
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Navbar;
