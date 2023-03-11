import React, { useState, useEffect } from "react";
import { NavbarButtons } from "../../constants/navbarButtons";
import { useGlobalContext } from "../../context/LoginContext";
import "./BurgerMenu.scss";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GroupIcon from "@mui/icons-material/Group";
import TelegramIcon from "@mui/icons-material/Telegram";

const BurgerMenu = ({ setCurrentPage, navigate, currentPage }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { handleLogout } = useGlobalContext();

  const handleNavLinkPressed = (buttonName: string) => {
    handleCloseMenu();
    if (buttonName !== NavbarButtons.LOGOUT) {
      setCurrentPage(buttonName);
      navigate(`/${buttonName.toLowerCase()}`);
    } else {
      handleLogout();
      navigate("/login");
    }
  };

  const handleShowChange = (e: any) => {
    setShowMenu(e.target.checked);
    if (!e.target.checked) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {
    if (!showMenu) {
      return;
    }
    document.body.classList.add("screen-size-page");
    const timerId = setTimeout(() => {
      setIsMenuOpened(true);
    }, 100);
    return () => {
      clearTimeout(timerId);
      document.body.classList.remove("screen-size-page");
    };
  }, [showMenu]);

  const handleCloseMenu = () => {
    setShowMenu(false);
    setIsMenuOpened(false);
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
          >
            <div className="pages-links">
              <h3
                onClick={() => handleNavLinkPressed(NavbarButtons.PHONES)}
                className="menu-link"
              >
                Phones
                <div className="icon-container">
                  <PhoneAndroidIcon color="inherit" fontSize="large" />
                </div>
              </h3>
              <h3
                onClick={() => handleNavLinkPressed(NavbarButtons.GROUPS)}
                className="menu-link"
              >
                Groups
                <div className="icon-container">
                  <GroupIcon color="inherit" fontSize="large" />
                </div>
              </h3>
              <h3
                onClick={() => handleNavLinkPressed(NavbarButtons.ACTIVATE)}
                className="menu-link"
              >
                Activate
                <div className="icon-container">
                  <TelegramIcon color="inherit" fontSize="large" />
                </div>
              </h3>
            </div>
            <h3
              onClick={() => handleNavLinkPressed(NavbarButtons.LOGOUT)}
              className="menu-link logout-menu-link"
            >
              Logout
              <div className="icon-container">
                <ExitToAppIcon color="inherit" fontSize="large" />
              </div>
            </h3>
          </section>
        </>
      )}
    </>
  );
};

export default BurgerMenu;
