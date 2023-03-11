import React, { useState } from "react";
import "./ActivateScraping.scss";

const ActivateScraping = () => {
  const [isScraping, setIsScraping] = useState(false);
  const handleScraping = async () => {
    setIsScraping(true);
  };
  return (
    <div onClick={handleScraping} className="button-container">
      {!isScraping ? (
        <button className="button-82-pushable">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">Activate Scraping</span>
          {isScraping && <div className="lds-hourglass"></div>}
        </button>
      ) : (
          <button disabled={isScraping} className="button-82-pushable">
          <span className="button-82-front-disabled text">Scraping</span>
          {isScraping && <div className="lds-hourglass"></div>}
        </button>
      )}
    </div>
  );
};

export default ActivateScraping;
