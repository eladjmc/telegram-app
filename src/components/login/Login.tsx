import React, { ChangeEvent, FormEvent, useState } from "react";
import { InputProps } from "../shared/ui-components/Input";
import SingleFrom from "../shared/ui-components/SingleFrom";
import UserForm from "../shared/ui-components/UserForm";
const Login = () => {
  const [form,setForm] = useState({
    email:'',
    password: '',
  });
  const onChange = (e:ChangeEvent<HTMLInputElement>,label:string) => {
    setForm({...form,[label.toLowerCase()]:e.target.value});
  }
  const onSubmitForm = () => {
    console.log("submitted");
    
  };
  const inputs:InputProps[] = [
    {
      label:'Email',
      type:'email',
      value:form.email,
      placeholder:' ',
      onChange,
    },
    {
      label:'Password',
      type:'password',
      value:form.password,
      placeholder:' ',
      onChange,
    },
  ]
  return (
    <SingleFrom inputs={inputs} title={'Login'} onSubmit={onSubmitForm} />
  );
};

export default Login;
