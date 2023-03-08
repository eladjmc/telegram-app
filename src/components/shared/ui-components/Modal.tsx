import { error } from "console";
import React, { ReactNode, useEffect, useState } from "react";
import "./Modal.scss";

export interface ModalButton {
  buttonText: string;
  btnClass?: string;
  handleClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  handleClose?: () => void;
  buttons: ModalButton[];
  title: string;
  message: string | ReactNode;
  error?: string;
}

const Modal = ({
  isOpen,
  handleClose,
  buttons,
  title,
  message,
  error,
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
      {isOpen && (
        <>
          <div onClick={handleClose} className="background-cover"></div>
          <div className={`modal-container ${visibilityClass}`}>
            <h3 className="modal-title">{title}</h3>
            {error && <p className="modal-error-message">{error}</p>}
            <div className="modal-message">{message}</div>
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
      )}
    </>
  );
};

export default Modal;
