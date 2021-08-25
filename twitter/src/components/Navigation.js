import React from "react";
import { Link, Route, Router, Switch } from "react-router-dom";

function Navigation({ userObj }) {
  console.log(userObj);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/profile">{userObj && userObj.displayName}의 프로필</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
