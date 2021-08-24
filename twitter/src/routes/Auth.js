import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "antd/dist/antd.css";
import { AuthService, firebaseInstance } from "../firebase";

function Auth() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [newAccount, setnewAccount] = useState(true);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setemail(value);
    }
    if (name === "password") {
      setpassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        let data;
        data = await AuthService.createUserWithEmailAndPassword(
          email,
          password
        ).catch((error) => console.log(error));
        console.log(data);
      } else {
        data = await AuthService.signInWithEmailAndPassword(
          email,
          password
        ).catch((err) => console.log(err));
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccount = () => setnewAccount((prev) => !prev);

  const onSocial = async (e) => {
    console.log(e.target);
    let provider;
    if (e.target.name === "google") {
      //인스턴스로 가져와야함
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (e.target.name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await AuthService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={email}
          name="email"
          type="text"
          placeholder="Email"
        ></Input>
        <Input
          onChange={onChange}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
        ></Input>
        <Input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          onClick={onSubmit}
        ></Input>
      </Form>
      <span onClick={toggleAccount}>
        {newAccount ? "Create Account" : "Log In"}
      </span>
      <div>
        <button name="google" onClick={(e) => onSocial(e)}>
          Google 아이디로 로그인
        </button>
        <button
          name="github"
          onClick={(e) => {
            console.log(e);
            onSocial(e);
          }}
        >
          Github 아이디로 로그인
        </button>
      </div>
    </div>
  );
}

export default Auth;
