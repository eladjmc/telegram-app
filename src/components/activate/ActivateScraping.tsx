import React, { useState } from "react";
import "./ActivateScraping.scss";

const ActivateScraping = () => {
  const [isScraping, setIsScraping] = useState(false);

  const handleScraping = async () => {
    try {
      setIsScraping(true);
    } catch (error) {}
  };

  const handleStopScraping = () => {
    setIsScraping(false);
  };

  return (
    <div className="button-container">
      {!isScraping ? (
        <button onClick={handleScraping} className="button-82-pushable">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">Activate Scraping</span>
          {isScraping && <div className="lds-hourglass"></div>}
        </button>
      ) : (
        <>
          <button disabled={isScraping} className="button-82-pushable">
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front-disabled text">Scraping</span>
            {isScraping && <div className="lds-hourglass"></div>}
          </button>

          <button onClick={() => handleStopScraping()} className="noselect">
            <span className="text-end-btn">Stop</span>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default ActivateScraping;
