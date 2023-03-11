import React, { ChangeEvent, useState } from "react";
import { InputProps } from "../shared/ui-components/Input";
import SingleFrom from "../shared/ui-components/SingleFrom";
import './ActivateForm.scss'
// Should contain the target group component and an activate button

interface ActivateFormProps {
    setIsSubmitted: (state:boolean)=>void;
    isSubmitted: boolean;
}

const ActivateForm = ({setIsSubmitted,isSubmitted}:ActivateFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    invite: "",
    timer: 60,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    setForm({ ...form, [label.toLowerCase()]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!e) return;
    e.preventDefault();
    //TODO: check if the submitted information is valid
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
      submitText={isLoading ? "Loading..." : isSubmitted ? "Change": 'Confirm'}
    />
  );
};

export default ActivateForm;
