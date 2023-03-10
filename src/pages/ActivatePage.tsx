import React, { useEffect } from "react";
import { useGlobalContext } from "../context/LoginContext";
import "./ActivatePage.scss";

const ActivatePage = () => {
  const { setNewPage } = useGlobalContext();

  useEffect(() => {
    setNewPage("Activate");
  });

  return (
    <section className="ActivatePage">
      <div className="snake">indicator-snake</div>
      <h1>Start Process</h1>
      <div className="button-container">
        <button className="button-82-pushable">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">Activate Scraping</span>
        </button>
      </div>
    </section>
  );
};

export default ActivatePage;
