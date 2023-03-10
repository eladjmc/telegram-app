import React, { useState, useEffect } from "react";
import { NavbarButtons } from "../../constants/navbarButtons";
import { useGlobalContext } from "../../context/LoginContext";
import "./BurgerMenu.scss";
import NavButton from "./NavButton";

const BurgerMenu = ({ setCurrentPage, navigate, currentPage }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { HandleLogout } = useGlobalContext();

  const handleNavLinkPressed = (buttonName: string) => {
    if (buttonName !== NavbarButtons.LOGOUT) {
      setCurrentPage(buttonName);
      navigate(`/${buttonName.toLowerCase()}`);
    } else {
      HandleLogout();
      navigate("/login");
    }
  };

const handleShowChange = (e:any) => {
  setShowMenu(e.target.checked);
  if(!e.target.checked){
    setIsMenuOpened(false)
  }
}

  useEffect(() => {
    if (!showMenu) {
      return;
    }
    const timerId = setTimeout(() => {
      setIsMenuOpened(true);
    }, 100);
    return () => {
      clearTimeout(timerId);
    };
  }, [showMenu]);

  const handleCloseMenu = () => {
    setShowMenu(false);
    setIsMenuOpened(false)
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 && showMenu) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenu]);

  return (
    <>
      <input
        onChange={handleShowChange}
        checked={showMenu}
        id="menu-toggle"
        type="checkbox"
      />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      {showMenu && (
        <>
          <div onClick={handleCloseMenu} className="dark-Layout"></div>
          <section
            className={`side-Menu ${isMenuOpened ? "side-Menu-show" : ""}`}
          ></section>
        </>
      )}
    </>
  );
};

export default BurgerMenu;
