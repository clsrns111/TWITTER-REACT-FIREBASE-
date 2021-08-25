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
        setuserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (arg) => user.updateProfile(arg),
        });
      } else {
        setisLoggedIn(false);
        setuserObj(null);
      }
      setinit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = AuthService.currentUser;
    setuserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (arg) => user.updateProfile(arg),
    });
  };

  return (
    <div className="App">
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          userObj={userObj}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        "initializing.."
      )}
      <footer>&copy;{new Date().getFullYear()}twitter</footer>
    </div>
  );
}

export default App;
