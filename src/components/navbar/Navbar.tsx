import React from "react";
import { useState } from "react";
import "../../styles/Navbar.scss";
import NavButton from "./NavButton";
import { navbarButtons } from "../../constants/navbarButtons";

const [phones, groups, activate, logout] = navbarButtons;

interface ButtonsSelected {
  phones: boolean;
  groups: boolean;
  activate: boolean;
}

const Navbar = () => {
  const [isSelected, setIsSelected] = useState<ButtonsSelected>({
    phones: true,
    groups: false,
    activate: false,
  });
  const handleNavLinkPressed = (buttonName: string) => {
    // this will not be a switch case at the end, just for now it is
    switch (buttonName) {
      case phones: {
        //TODO: handle navigate and other logic
        console.log(phones, "Pressed link");

        break;
      }
      case groups: {
        //TODO: handle navigate and other logic
        console.log(groups, "Pressed link");
        break;
      }
      case activate: {
        //TODO: handle navigate and other logic
        console.log(activate, "Pressed link");
        break;
      }
      case logout: {
        //TODO: handle navigate and other logic
        console.log(logout, "Pressed link");
        break;
      }
      default:
        break;
    }
  };

  return (
    <header className="navbar">
      <div className="logo"></div>
      <div className="navigate-links">
        <div className="phones">
          <NavButton
            buttonText={phones}
            isSelected={isSelected.phones}
            action={handleNavLinkPressed}
          />
        </div>
        <div className="groups">
          <NavButton
            buttonText={groups}
            isSelected={isSelected.groups}
            action={handleNavLinkPressed}
          />
        </div>
        <div className="activate">
          <NavButton
            buttonText={activate}
            isSelected={isSelected.activate}
            action={handleNavLinkPressed}
          />
        </div>
      </div>
      <div className="logout">
        <NavButton
          buttonText={logout}
          isSelected={false}
          action={handleNavLinkPressed}
        />
      </div>
    </header>
  );
};

export default Navbar;
