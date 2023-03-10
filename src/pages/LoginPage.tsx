import React, { useEffect, useState } from "react";
import Login from "../components/login/Login";
import Modal from "../components/shared/ui-components/Modal";
import { useGlobalContext } from "../context/LoginContext";
import './LoginPage.scss'
const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { setNewPage } = useGlobalContext();

  useEffect(() => {
    setNewPage("Login");
  });


  const handleCloseModal = () => {
    setErrorMessage('');
    setIsOpen(false);
  };

  return (
    <section className="LoginPage">
      {isOpen && (
        <Modal
          buttons={[{ buttonText: "Close", handleClick: handleCloseModal }]}
          isOpen={isOpen}
          handleClose={handleCloseModal}
          title="Login Error"
          message={errorMessage}   
        />
      )}
      <Login setErrorMessage={setErrorMessage} setIsOpen={setIsOpen}/>
    </section>
  );
};

export default LoginPage;
