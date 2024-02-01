import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import classes from "./UserForm.module.scss";

function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post("/api/users/login", {
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.register}>
      <div className={classes.titleContent}>
        <h1 className={classes.title}>Login 🚀</h1>
      </div>
      <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
          email:
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            value="jena.doe@dev.com"
          />
        </label>
        <br />
        <label htmlFor="password">
          password:
          <input
            name="password"
            type="password"
            placeholder="password"
            required
            value="jen@D03"
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
