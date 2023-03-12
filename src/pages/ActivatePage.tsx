import React, { useEffect, useState } from "react";
import ActivateForm from "../components/activate/ActivateForm";
import ActivateScraping from "../components/activate/ActivateScraping";
import { Pages, useGlobalContext } from "../context/LoginContext";
import "./ActivatePage.scss";
import API from "../services/api";
import { Alert, AlertTitle } from "@mui/material";

const ActivatePage = () => {
  const { setNewPage } = useGlobalContext();
  const [dataAmounts, setDataAmounts] = useState({ phones: 0, groups: 0 });
  const [form, setForm] = useState({
    invite: "",
    timer: 60,
  });
  const [isLoading, setIsLoading] = useState(true);

  const getSetting = async () => {
    try {
      setIsLoading(true);
      const result = await API.get("/activate/settings");
      setDataAmounts({
        phones: parseInt(result.data.amount_of_phones),
        groups: parseInt(result.data.amount_of_groups),
      });
      setForm({
        invite: result.data.target_group,
        timer: parseInt(result.data.seconds_between_request),
      });
      setIsLoading(false);
    } catch (error) {
      setDataAmounts({
        phones: 0,
        groups: 0,
      });
    }
  };

  useEffect(() => {
    setNewPage(Pages.ACTIVATE);
    getSetting();
  },[setNewPage]);

  return (
    <section className="ActivatePage">
      <h1>Start Process</h1>

      <div className="actions-container">
        {!!(dataAmounts.phones * dataAmounts.groups) && !isLoading ? (
          <>
            <ActivateForm form={form} setForm={setForm} />
            <ActivateScraping intervalTimer={form.timer} />
          </>
        ) : (
          <div className="error-no-amount">
            <h3>Activation Condition Invalid</h3>
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Encountered an error — <strong>{'No Numbers/Groups'}</strong>
          </Alert>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivatePage;
