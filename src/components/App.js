import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import {authService} from '../Database';
import { connect } from "react-redux";
import { fnUser } from 'store/store';

function App({dispatch}) {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setUser = (type, user, userData) => {
    if (type ==='INIT') {
      dispatch(fnUser.initUser(null)); 
    } else if (type === 'ADD') {
      dispatch(fnUser.initUser(user));  
    }
  };
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = user.providerData[0];
        setUser('ADD',user, userData);
        setIsLoggedIn(true);        
      } else {
        setUser('INIT', null, null);
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
