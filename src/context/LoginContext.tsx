import React, { createContext, useContext, useEffect, useState } from "react";


interface LoginProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  isLogged: boolean;
  HandleLogout: () => void;
  HandleLogin: () => void;
  setNewPage:(page:string)=>void,
  currentPage:string,
}

const LoginContext = createContext<ContextProps>({
  isLogged: false,
  HandleLogout: () => {},
  HandleLogin: () => {},
  setNewPage:(page:string)=>{},
  currentPage:'login',
});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    // Load isLogged from local storage on initialization
    const storedValue = localStorage.getItem("isLogged");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [currentPage, setCurrentPage] = useState<string>("login");



  useEffect(() => {
    // Save isLogged to local storage whenever it changes
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
  }, [isLogged]);


  const HandleLogout = () => {
    setIsLogged(false);
    setCurrentPage('login')
    //TODO: Clear token
  };

  const HandleLogin = () => {
    setIsLogged(true);
    setCurrentPage('welcome')
  };

  const setNewPage = (page:string) =>{
    setCurrentPage(page)
  }

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        HandleLogout,
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

export { LoginContext, LoginProvider };
