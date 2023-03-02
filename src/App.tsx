import React, { FormEvent } from "react";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import UserForm from "./components/shared/ui-components/UserForm";

function App() {
  const onSubmitForm = (e: FormEvent<HTMLInputElement>) => {
    console.log("submitted");
  };

  return (
    <div className="App">
      <Navbar/>
      <Login />
    </div>
  );
}

export default App;
