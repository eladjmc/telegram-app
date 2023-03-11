import React, { useEffect } from 'react'
import {Pages, useGlobalContext} from '../context/LoginContext';

const WelcomePage = () => {

  const { setNewPage } = useGlobalContext();

  useEffect(() => {
    setNewPage(Pages.WELCOME);
  });

  return (
    <div>WelcomePage</div>
  )
}

export default WelcomePage
