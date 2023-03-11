import React, { useEffect, useState } from "react";
import ActivateForm from "../components/activate/ActivateForm";
import ActivateScraping from "../components/activate/ActivateScraping";
import { Pages, useGlobalContext } from "../context/LoginContext";

import "./ActivatePage.scss";
import { resolve } from "path";

const ActivatePage = () => {
  const { setNewPage } = useGlobalContext();
  const [dataAmounts, setDataAmounts] = useState({ phones: 1, groups: 1 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNewPage(Pages.ACTIVATE);
  });

  return (
    <section className="ActivatePage">
      <h1>Start Process</h1>

      <div className="actions-container">
        {!!(dataAmounts.phones * dataAmounts.groups) ? (
          <>
            <ActivateForm
              setIsSubmitted={setIsSubmitted}
              isSubmitted={isSubmitted}
              setDataAmounts={setDataAmounts}
              setIsLoading={setIsLoading}
            />
            <ActivateScraping />
          </>
        ) : (
          <div className="error-no-amount">
            <h3>Activation Condition:</h3>
            <h3>One Group And Number</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivatePage;
