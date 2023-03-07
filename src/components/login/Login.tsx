import React, { ChangeEvent, FormEvent, useState } from "react";
import { useGlobalContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { InputProps } from "../shared/ui-components/Input";
import SingleFrom from "../shared/ui-components/SingleFrom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { HandleLogin } = useGlobalContext();

  const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    setForm({ ...form, [label.toLowerCase()]: e.target.value });
  };
  const onSubmitForm = () => {
    console.log("submitted");
    HandleLogin(); // use this only when confirmed details
    navigate(`/phones`);

  };
  const inputs: InputProps[] = [
    {
      label: "Email",
      type: "email",
      value: form.email,
      placeholder: " ",
      onChange,
    },
    {
      label: "Password",
      type: "password",
      value: form.password,
      placeholder: " ",
      onChange,
    },
  ];
  return <SingleFrom inputs={inputs} title={"Login"} onSubmit={onSubmitForm} />;
};

export default Login;
