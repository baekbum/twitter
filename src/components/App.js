import React, { useEffect, useState } from 'react';
import AppRouter from './Router/Router';
import {authService } from '../Database';
import { connect } from "react-redux";
import { getUserDB, setUserObject } from './Auth/UserInfo';

function App({dispatch}) {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUserObject('ADD', await getUserDB(user.uid)));
        setIsLoggedIn(true);        
      } else {
        dispatch(setUserObject('INIT', null));
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
  return {dispatch};
}

export default connect(null, mapDispatchToProps) (App);
