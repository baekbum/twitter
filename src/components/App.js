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
        setUserObj({
          uid : user.uid,
          displayName : user.displayName,
          updateProfile : (args) => user.updateProfile(args)
        });
        setIsLoggedIn(true);        
      } else {
        setUserObj(null);
        setIsLoggedIn(false);        
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid : user.uid,
      displayName : user.displayName,
      updateProfile : (args) => user.updateProfile(args)
    });
  };
  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/> : 'initializing...' }
    </>    
  )
}

export default App;
