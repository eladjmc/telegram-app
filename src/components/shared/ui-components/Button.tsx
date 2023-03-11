import React from "react";
import "./Button.scss";

interface ButtonProps {
  onClick: () => void;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = ({onClick, text, isLoading, disabled}: ButtonProps) => {
  return (
    <button onClick={onClick} className="button-82-pushable" disabled={disabled}>
      <span className="button-82-shadow"></span>
      <span className="button-82-edge"></span>
      <span className="button-82-front text">{text}</span>
      {isLoading && <div className="lds-hourglass"></div>}
    </button>
  );
};

export default Button;
