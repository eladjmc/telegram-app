import React, { useEffect, useState } from "react";
import "./ActivateScraping.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../shared/ui-components/Button";
import API from "../../services/api";
import { Alert, AlertTitle } from "@mui/material";
import ActivateInstructions from "./ActivateInstructions";

const MILISEC_IN_SECOND = 1000;
let intervalId = setInterval(() => {}, Number.MAX_SAFE_INTEGER);

interface ActivateScrapingProps {
  intervalTimer: number;
}

const ActivateScraping = ({ intervalTimer }: ActivateScrapingProps) => {
  const [isScraping, setIsScraping] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleScraping = async () => {
    setErrorMessage("");
    deployToast();
    intervalId = setInterval(() => {
      deployToast();
    }, intervalTimer * MILISEC_IN_SECOND);

    setIsScraping(true);
  };

  const handleStopScraping = () => {
    clearInterval(intervalId);
    setIsScraping(false);
  };
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const deployToast = async () => {
    const result = API.post("/activate", null);
    toast.promise(result, {
      pending: "Scraping",
      success: {
        render({ data }) {
          return data?.data || "Success";
        },
      },
      error: {
        render({ data }) {
          console.error(data);
          setIsScraping(false);
          clearInterval(intervalId);
          // setErrorMessage(JSON.stringify(data));
          setErrorMessage("Error Scraping");
          return "Error Scraping";
        },
      },
    });
  };

  return (
    <>
      <div className="button-container">
        <ActivateInstructions />
        <ToastContainer />
        <div className="scraping-btn-container">
          <Button
            text={isScraping ? "Scraping..." : "Start"}
            onClick={handleScraping}
            isLoading={isScraping}
            disabled={isScraping}
          />
        </div>
        {isScraping && (
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
        )}
        {!!errorMessage && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Encountered an error — <strong>{errorMessage}</strong>
          </Alert>
        )}
      </div>
    </>
  );
};

export default ActivateScraping;
