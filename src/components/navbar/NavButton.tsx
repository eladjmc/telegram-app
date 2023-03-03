import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
interface buttonProps {
  buttonText: string;
  currentPage: string;
  action: (buttonName: string) => void;
}

const NavButton = ({ buttonText, action, currentPage }: buttonProps) => {
  const location = useLocation();

  const isSelected = () => {

    return currentPage === buttonText;
  };
  return (
    <div
      className={`nav-btn ${isSelected() ? "nav-btn-selected" : ""}`}
      onClick={() => {
        action(buttonText);
      }}
    >
      {buttonText}
    </div>
  );
};

export default NavButton;
