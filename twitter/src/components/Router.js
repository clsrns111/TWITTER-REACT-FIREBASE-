import React, { useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

export default ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <>
      <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        {isLoggedIn ? (
          <>
            {" "}
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile
                refreshUser={refreshUser}
                userObj={userObj}
                isLoggedIn={isLoggedIn}
              />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Router>
    </>
  );
};
