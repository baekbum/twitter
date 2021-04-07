import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import {authService} from '../Database';

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        setIsLoggedIn(true);        
      } else {
        setUserObj(null);
        setIsLoggedIn(false);        
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : 'initializing...' }
      <footer>&copy; Twitter {new Date().getFullYear} </footer>
    </>    
  )
}

export default App;
