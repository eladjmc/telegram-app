import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { Pages } from "../../context/LoginContext";
import { InputProps } from "../shared/ui-components/Input";
import SingleFrom from "../shared/ui-components/SingleFrom";
import { validateEmail } from "../shared/utils/validateEmail";
import API from "../../services/api";

interface LoginProps {
  setIsOpen: (is: boolean) => void;
  setErrorMessage: (message: string) => void;
}

const Login = ({ setIsOpen, setErrorMessage }: LoginProps) => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false);
        signIn({
          token,
          tokenType: "Bearer",
          expiresIn: 3600,
        });
        navigate(`/${Pages.PHONES}`);
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
