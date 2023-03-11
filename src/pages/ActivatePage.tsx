import React, { useEffect, useState } from "react";
import ActivateForm from "../components/activate/ActivateForm";
import ActivateScraping from "../components/activate/ActivateScraping";
import {Pages, useGlobalContext} from "../context/LoginContext";
import "./ActivatePage.scss";

const ActivatePage = () => {
  const { setNewPage } = useGlobalContext();
  const [dataAmount, setDataAmount] = useState({ phones: 1, groups: 1 });
  const [isSubmitted,setIsSubmitted] = useState(false);
  useEffect(() => {
    setNewPage(Pages.ACTIVATE);
  });

  return (
    <section className="ActivatePage">
      <div className="snake">indicator-snake</div>
      <h1>Start Process</h1>
      {!!(dataAmount.phones * dataAmount.groups) ? (
        <>
          <ActivateForm setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} />
          {isSubmitted && <ActivateScraping/>}
        </>
      ) : (
        <div className="error-no-amount">
          <h3>Activation Condition:</h3>
          <h3>One Group And Number</h3>
        </div>
      )}
    </section>
  );
};

export default ActivatePage;
