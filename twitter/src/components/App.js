import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { AuthService, firebaseInstance } from "../firebase";

function App() {
  const [init, setinit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(AuthService.currentUser);
  const [userObj, setuserObj] = useState(null);

  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true);
        setuserObj(user);
      } else {
        setisLoggedIn(false);
      }
      setinit(true);
    });
  }, []);
  const LogOutHandler = () => {
    firebaseInstance.auth.signup();
    setisLoggedIn(false);
  };
  return (
    <div className="App">
      {init ? (
        <AppRouter userObj={userObj} isLoggedIn={isLoggedIn} />
      ) : (
        "initializing.."
      )}
      <footer>&copy;{new Date().getFullYear()}twitter</footer>
    </div>
  );
}

export default App;
