import React, { useEffect, useState } from "react";
import "./Modal.scss";

interface ModalButton {
  buttonText: string;
  btnClass?: string;
  handleClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  buttons: ModalButton[];
  title: string;
  message: string;
}
const Modal = ({
  isOpen,
  handleClose,
  buttons,
  title,
  message,
}: ModalProps) => {
  const [visibilityClass, setVisibilityClass] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setVisibilityClass("opacity-one");
  }, [isOpen]);

  return (
    <>
      <div onClick={handleClose} className="background-cover"></div>
      <div className={`modal-container ${visibilityClass}`}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons-container">
          {buttons.map((button) => {
            return (
              <button
                key={button.buttonText}
                onClick={button.handleClick}
                className={button.btnClass || "default-btn"}
              >
                {button.buttonText}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Modal;
