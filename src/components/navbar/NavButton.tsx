import React from "react";
import { useState, useEffect } from "react";
import {Pages, useGlobalContext} from "../../context/LoginContext";
interface buttonProps {
  buttonText: string;
  action: (buttonName: Pages) => void;
}

const NavButton = ({ buttonText, action}: buttonProps) => {
  const [isCurrentPage, setIsCurrentPage] = useState(false)
  const {currentPage} = useGlobalContext()

  useEffect(() => {
    setIsCurrentPage(currentPage===buttonText.toLowerCase())

  }, [currentPage,buttonText])
  
  return (
    <div
      className={`nav-btn ${isCurrentPage ? "nav-btn-selected" : ""}`}
      onClick={() => {
        action(buttonText.toLowerCase() as Pages);
      }}
    >
      {buttonText}
    </div>
  );
};

export default NavButton;
