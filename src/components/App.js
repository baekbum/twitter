import React, { useState } from 'react';
import AppRouter from './Router';
import {authService} from '../Database';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Twitter {new Date().getFullYear} </footer>
    </>    
  )
}

export default App;
