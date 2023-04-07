import React, { ChangeEvent } from "react";
import API from "../../services/api";
import { InputProps } from "../shared/ui-components/Input";
import SingleFrom from "../shared/ui-components/SingleFrom";
import "./ActivateForm.scss";
// Should contain the target group component and an activate button

interface ActivateFormProps {
  form: { invite: string; timer: number };
  setForm: (settings: { invite: string; timer: number }) => void;
  minimumAllowed: number;
}

const ActivateForm = ({
  setForm,
  form,
  minimumAllowed,
}: ActivateFormProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    setForm({ ...form, [label.toLowerCase()]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!e) return;
    e.preventDefault();
    //TODO: check if the submitted information is valid
    await API.post("/activate/settings", {
      target_group: form.invite,
      seconds_between_request: form.timer,
    });
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
      min: minimumAllowed,
      message: `Minimum allowed: ${minimumAllowed}`,
      onChange,
    },
  ];

  return (
    <SingleFrom
      inputs={inputs}
      title={"Configuration"}
      onSubmit={onSubmitForm}
      submitText="Update"
    />
  );
};

export default ActivateForm;
