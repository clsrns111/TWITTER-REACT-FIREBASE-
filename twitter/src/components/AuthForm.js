import { Input, Form } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import { AuthService } from "../firebase";

function AuthForm() {
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
    console.log(email, password);
    try {
      let data;
      if (newAccount) {
        data = await AuthService.createUserWithEmailAndPassword(
          email,
          password
        ).catch((error) => console.log(error));
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

  return (
    <div>
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
    </div>
  );
}

export default AuthForm;
