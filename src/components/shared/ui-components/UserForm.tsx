import React, { useState,FormEvent } from "react";

import { ReactNode } from "react";
import "./UserForm.scss";

interface userFormProps {
  fields: string[];
  submitForm: (e: FormEvent<HTMLInputElement>) => void,
  children: ReactNode,
}
const UserForm = ({ fields, submitForm ,children }: userFormProps) => {

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <form className={`form ${fields.length > 2 ? '': 'login-form'}`}onSubmit={handleSubmit}>
      {children}
      <div className="input-container ic1">
        <input
        
          className="input"
          type="email"
          id="email"
          placeholder=" "
          value={email}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <div className="cut"></div>
        <label className="placeholder">{fields[0]}</label>
      </div>

      {fields.length > 2 && (
        <div className="input-container ic1">
          <input
            className="input"
            type="text"
            id="name"
            placeholder=" "
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <div className="cut"></div>
          <label className="placeholder">{fields[2]}:</label>
        </div>
      )}

      <div className="input-container ic1">
        <input
          className="input"
          type="password"
          placeholder=" "
          id="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className="cut"></div>
        <label className="placeholder">{fields[1]}</label>
      </div>
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
