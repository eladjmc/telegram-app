import React from "react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/LoginContext";
interface buttonProps {
  buttonText: string;
  action: (buttonName: string) => void;
}

const NavButton = ({ buttonText, action}: buttonProps) => {
  const [isCurrentPage, setIsCurrentPage] = useState(false)
  const {currentPage} = useGlobalContext()

  useEffect(() => {
    setIsCurrentPage(currentPage===buttonText)

  }, [currentPage,buttonText])
  
  return (
    <div
      className={`nav-btn ${isCurrentPage ? "nav-btn-selected" : ""}`}
      onClick={() => {
        action(buttonText);
      }}
    >
      {buttonText}
    </div>
  );
};

export default NavButton;
