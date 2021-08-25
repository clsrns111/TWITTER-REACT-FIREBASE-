import React, { useState } from "react";
import { AuthService, firebaseInstance } from "../firebase";
import AuthForm from "../components/AuthForm";

function Auth() {
  const onSocial = async (e) => {
    let provider;
    if (e.target.name === "google") {
      //인스턴스로 가져와야함
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (e.target.name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await AuthService.signInWithPopup(provider);
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
      <AuthForm />
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
