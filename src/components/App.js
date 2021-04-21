import React, { useEffect, useState } from 'react';
import AppRouter from './Router/Router';
import {authService } from '../Database';
import { connect } from "react-redux";
import { getUserDB, setUserObject } from '../dbFuncion/UserInfo';
import '../css/App.css';

function App({saveUser, initUser}) {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        saveUser(await getUserDB(user.uid)); 
        setIsLoggedIn(true);
      } else {
        initUser();
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing...' }
    </>    
  )
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (obj) => dispatch(setUserObject('ADD', obj)),
    initUser: () => dispatch(setUserObject('INIT', null))
  };
}

export default connect(null, mapDispatchToProps) (App);
