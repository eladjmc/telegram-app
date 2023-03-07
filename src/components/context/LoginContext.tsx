import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  isLogged: boolean;
  HandleLogout: () => void;
  HandleLogin: () => void;
}

const LoginContext = createContext<ContextProps>({
  isLogged: false,
  HandleLogout: () => {},
  HandleLogin: () => {},
});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const navigate = useNavigate();

  const HandleLogout = () => {
    setIsLogged(false);
    //TODO: Clear token
    navigate("/login");
  };

  const HandleLogin = () => {
    setIsLogged(true);
    navigate("/phones");
  };

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        HandleLogout,
        HandleLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(LoginContext);
};

export { LoginContext, LoginProvider };
