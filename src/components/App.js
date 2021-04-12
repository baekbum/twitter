import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import {authService} from '../Database';
import defaultImage from '../image/default.png';

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const initUser = () => {
    const obj = {
      uid : '',
      displayName : '',
      email : '',
      phoneNumber : '',
      photoURL : '',
      updateProfile : null
    }
    setUserObj(obj);
  };
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0];
        setUserObj({
          uid : user.uid,
          displayName : userData.displayName,
          email : userData.email,
          phoneNumber : userData.phoneNumber,
          photoURL : userData.photoURL||defaultImage,
          updateProfile : (args) => user.updateProfile(args)
        });
        setIsLoggedIn(true);        
      } else {
        initUser();
        setIsLoggedIn(false);        
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    const userData = user.providerData[0];
    setUserObj({
      uid : user.uid,
      displayName : userData.displayName,
      email : userData.email,
      phoneNumber : userData.phoneNumber,
      photoURL : userData.photoURL||defaultImage,
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
