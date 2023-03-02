import React from "react";

interface buttonProps {
  buttonText: string;
  isSelected: boolean;
  action: (buttonName: string) => void;
}

const NavButton = ({ buttonText, isSelected, action }: buttonProps) => {
  return (
    <div
      className={`nav-btn ${isSelected ? "nav-btn-selected" : ""}`}
      onClick={() => {
        action(buttonText);
      }}
    >
      {buttonText}
    </div>
  );
};

export default NavButton;
