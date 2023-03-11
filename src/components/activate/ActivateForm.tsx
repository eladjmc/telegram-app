import React, { ChangeEvent, useEffect, useState } from "react";
import API from "../../services/api";
import { InputProps } from "../shared/ui-components/Input";
import SingleFrom from "../shared/ui-components/SingleFrom";
import "./ActivateForm.scss";
// Should contain the target group component and an activate button

interface ActivateFormProps {
  setIsSubmitted: (state: boolean) => void;
  setIsLoading: (state: boolean) => void;
  isSubmitted: boolean;
  setDataAmounts: (settings: { phones: number; groups: number }) => void;
}

const ActivateForm = ({
  setIsSubmitted,
  isSubmitted,
  setDataAmounts,
  setIsLoading,
}: ActivateFormProps) => {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [form, setForm] = useState({
    invite: "",
    timer: 60,
  });

  const getSetting = async () => {
    try {
      setIsLoading(true);
      const result = await API.get("/activate/settings");
      setDataAmounts({
        phones: parseInt(result.data.amount_of_phones),
        groups: parseInt(result.data.amount_of_groups),
      });
      setForm({
        invite:result.data.target_group,
        timer:parseInt(result.data.seconds_between_request),
      })
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getSetting();
    return () => {};
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    setForm({ ...form, [label.toLowerCase()]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!e) return;
    e.preventDefault();
    //TODO: check if the submitted information is valid
    const result = await API.post('/activate/settings',{
      target_group:form.invite,
      seconds_between_request:form.timer,
    })
    setIsSubmitted(true);
  };

  const inputs: InputProps[] = [
    {
      label: "Invite",
      type: "string",
      value: form.invite,
      placeholder: " ",
      onChange,
    },
    {
      label: "Timer",
      type: "number",
      value: form.timer,
      placeholder: " ",
      min: 60,
      onChange,
    },
  ];

  return (
    <SingleFrom
      inputs={inputs}
      title={"Configuration"}
      onSubmit={onSubmitForm}
      submitText={isLoadingForm ? "Loading..." : isSubmitted ? "Change" : "Confirm"}
    />
  );
};

export default ActivateForm;
