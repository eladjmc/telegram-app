import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

export enum Pages {
  LOGIN = "login",
  WELCOME = "welcome",
  ACTIVATE = "activate",
  GROUPS = "groups",
  PHONES = "phones",
  LOGOUT = "logout",
}

interface LoginProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  isLogged: string;
  handleLogout: () => void;
  HandleLogin: (token: string) => void;
  setNewPage: (page: Pages) => void;
  currentPage: Pages;
}

const LoginContext = createContext<ContextProps>({
  isLogged: '',
  handleLogout: () => {},
  HandleLogin: (token: string) => {},
  setNewPage: (page: Pages) => {},
  currentPage: Pages.LOGIN,
});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<string>(() => {
    // Load isLogged from local storage on initialization
    const token = localStorage.getItem("token");

    token && API.setToken(token);
    return token || '';
  });
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.LOGIN);
  // const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogged('');
    API.removeToken();
    setCurrentPage(Pages.LOGIN);
    localStorage.removeItem("token")
  };

  const HandleLogin = (token: string) => {
    setIsLogged(token);
    API.setToken(token);
    localStorage.setItem("token", token);
  };

  const setNewPage = (page: Pages) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!isLogged) {
      // navigate(`/${Pages.LOGIN}`);
    }
    if (isLogged && currentPage === Pages.LOGIN) {
      // navigate(`/${Pages.PHONES}`);
    }
  }, [isLogged]);

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        handleLogout,
        HandleLogin,
        setNewPage,
        currentPage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(LoginContext);
};

export {LoginContext, LoginProvider};
