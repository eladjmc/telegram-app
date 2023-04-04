import React, { ChangeEvent, FormEvent, useState } from "react";
import { useGlobalContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { InputProps } from "../shared/ui-components/Input";
import SingleFrom from "../shared/ui-components/SingleFrom";
import { validateEmail } from "../shared/utils/validateEmail";
import USERS_API from "../../services/usersApi";
import API from "../../services/api";
import {NavbarButtons} from "../../constants/navbarButtons";
interface LoginProps {
  setIsOpen: (is: boolean) => void;
  setErrorMessage: (message: string) => void;
}

const Login = ({ setIsOpen, setErrorMessage }: LoginProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { HandleLogin } = useGlobalContext();

  const onChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    setForm({ ...form, [label.toLowerCase()]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!e) return;
    e.preventDefault();

    const { email, password } = form;

    if (!email || validateEmail(email)) {
      const msg = "Please enter a valid email";
      setErrorMessage(msg);
      setIsOpen(true);
      return;
    }

    if (!password) {
      const msg = "Please enter a password";
      setErrorMessage(msg);
      setIsOpen(true);
      return;
    } else {
      setIsLoading(true);

      try {
        const result = await API.post("/auth/login", {
          email,
          password,
        });
        const token = result.data;
        HandleLogin(`Bearer ${token}`);
        setIsLoading(false);
        navigate(`/${NavbarButtons.PHONES.toLowerCase()}`);
      } catch (error: any) {
        setErrorMessage(error.response?.data || error.message || error);
        setIsOpen(true);
        setIsLoading(false);
      }
    }
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
  return (
    <SingleFrom
      inputs={inputs}
      title={"Login"}
      onSubmit={onSubmitForm}
      submitText={isLoading ? "Loading..." : "Submit"}
    />
  );
};

export default Login;
