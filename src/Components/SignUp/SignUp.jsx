import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { useLocalStorage } from "../../CustomHooks/useLocalStorage";
import css from "./SignUp.module.css";

export const SignUp = () => {
  useEffect(() => {
    setTimeout(function () {
      setRender(true);
    }, 2600);
  }, []);

  const [user, setUser] = useLocalStorage("user", { username: "" });
  const [error, setError] = useState(false);
  const [errorP, setErrorP] = useState({
    error: false,
    length: false,
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,
  });
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [data, setData] = useState({ email: "", password: "", name: "" });

  function handleChange(evt) {
    setData({ ...data, [evt.target.name]: evt.target.value });
    validateEmail(evt);
    validatePassword(evt);
  }
  function handleSignUp(evt) {
    if (error || errorP.error || data.email === "" || data.password === "") {
      return;
    }
    setUser({ username: data.email });
    navigate("/user");
  }

  function validateEmail(evt) {
    if (evt.target.name === "email") {
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.value)
      ) {
        setError(false);
        return;
      }
      setError(true);
    }
  }
  function validatePassword(evt) {
    if (evt.target.name === "password") {
      if (
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/.test(
          evt.target.value
        )
      ) {
        setErrorP({ ...errorP, error: false });
        return;
      }
      console.log({
        ...errorP,
        error: true,
        length: evt.target.value.length < 8,
        uppercase: !/[A-Z]/.test(evt.target.value),
        lowercase: !/[a-z]/.test(evt.target.value),
        numeric: !/\d/.test(evt.target.value),
        special: !/[@$!%*?&]/.test(evt.target.value),
      });
      setErrorP({
        ...errorP,
        error: true,
        length: evt.target.value.length < 8,
        uppercase: !/[A-Z]/.test(evt.target.value),
        lowercase: !/[a-z]/.test(evt.target.value),
        numeric: !/\d/.test(evt.target.value),
        special: !/[@$!%*?&]/.test(evt.target.value),
      });
    }
  }

  return (
    <>
      {render ? (
        <>
          <div className={css.titleContainer}>
            <div className={css.title}>CALCULATOR</div>
            <div className={css.title2}>APP</div>
          </div>
          <form className={css.signUpComponent}>
            <div>
              <div className={css.signUp_form}>
                <label className={css.signUp_label}>Username:</label>
                <input
                  className={css.signUp_input}
                  name="email"
                  onChange={handleChange}
                  type="text"
                  placeholder="explample@here.com"
                />
              </div>
              {error === true ? (
                <div className={css.signUp_error}>
                  Username must be an email
                </div>
              ) : (
                <div className={css.signUp_error}></div>
              )}
              <div className={css.signUp_form}>
                <label className={css.signUp_label}>Password:</label>
                <input
                  className={css.signUp_input}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="********"
                  autoComplete="On"
                />
              </div>
              {errorP.error ? (
                <div className={css.signUp_error2}>
                  Password Error:
                  <div>
                    {errorP.length ? (
                      <div className={css.signUp_error2}>
                        -It's length must be greater than or equal to 8
                      </div>
                    ) : null}
                    {errorP.uppercase ? (
                      <div className={css.signUp_error2}>
                        -It must contain one or more uppercase characters
                      </div>
                    ) : null}
                    {errorP.lowercase ? (
                      <div className={css.signUp_error2}>
                        -It must contain one or more lowercase characters
                      </div>
                    ) : null}
                    {errorP.numeric ? (
                      <div className={css.signUp_error2}>
                        -It must contain one or more numeric values
                      </div>
                    ) : null}
                    {errorP.special ? (
                      <div className={css.signUp_error2}>
                        -It must contain one or more special characters '@ $ ! %
                        * ? &'
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
              <div className={css.signUp_formForgot}>
                <div className={css.signUp_forgot}>Forgot your password?</div>
              </div>
              <div className={css.signUp_buttonContainer}>
                <Button
                  sx={{
                    borderColor: "var(--secondary-color)",
                    color: "var(--secondary-color)",
                    height: "40px",
                    padding: "12px",
                    margin: "12px",
                    marginTop: "0px",
                    width: "210px",
                    ":hover": { color: "yellow", borderColor: "yellow" },
                  }}
                  variant="outlined"
                  onClick={(e) => {
                    handleSignUp();
                  }}
                >
                  SIGN UP
                </Button>
              </div>
              <div className={css.signUp_buttonContainer}>
                <Button
                  sx={{
                    borderColor: "var(--secondary-color)",
                    color: "var(--secondary-color)",
                    height: "40px",
                    padding: "12px",
                    margin: "12px",
                    width: "210px",
                    ":hover": {
                      color: "yellow",
                      borderColor: "yellow",
                    },
                  }}
                  variant="outlined"
                  onClick={() => {
                    console.log("hola");
                  }}
                >
                  Create your account
                </Button>
              </div>
            </div>
          </form>
        </>
      ) : null}
    </>
  );
};
