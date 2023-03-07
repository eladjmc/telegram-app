import React, { useState } from "react";
import Login from "../components/login/Login";
import Modal from "../components/shared/ui-components/Modal";
import './LoginPage.scss'
const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="LoginPage">
      {/* {isOpen && (
        <Modal
          buttons={[{ buttonText: "Close", handleClick: handleCloseModal }]}
          isOpen={isOpen}
          handleClose={handleCloseModal}
          title="Error"
          message="blabla asdsadasd safsagasg safasfasf bla bla bla"
        />
      )} */}
      <Login />
    </section>
  );
};

export default LoginPage;
