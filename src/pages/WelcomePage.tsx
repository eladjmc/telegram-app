import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/LoginContext';

const WelcomePage = () => {

  const { setNewPage } = useGlobalContext();

  useEffect(() => {
    setNewPage("Welcome");
  });

  return (
    <div>WelcomePage</div>
  )
}

export default WelcomePage