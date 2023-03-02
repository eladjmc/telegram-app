import React, { FormEvent } from "react";
import UserForm from "../shared/ui-components/UserForm";
const Login = () => {
  const onSubmitForm = (e: FormEvent<HTMLInputElement>) => {
    console.log("submitted");
  };
  return (
    <UserForm fields={["Email", "Password"]} submitForm={onSubmitForm}>
      <h3>Login</h3>
    </UserForm>
  );
};

export default Login;
