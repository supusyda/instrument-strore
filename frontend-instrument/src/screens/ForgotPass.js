import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Form } from "reactstrap";
import { forgot } from "../services/userService";
import { createUser } from "../services/userService";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
const ForgotPass = () => {
  window.scrollTo(0, 0);
  let [userData, setUserData] = useState({
    email: "",
  });

  const checkValidate = (data) => {
    for (let k in data) {
      if (data[k] === "") {
        return false;
      }
    }
    return true;
  };
  let onSubmit = async (event) => {
    event.preventDefault();
    if (checkValidate(userData)) {
      console.log(userData);
      let res = await forgot(userData);
    }
  };

  let handleInput = (indexKey, data) => {
    let tempData = userData;
    tempData[indexKey] = data;
    setUserData(tempData);
    console.log(tempData);
  };

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <Form className="Login col-md-8 col-lg-4 col-11" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              handleInput("email", e.target.value);
            }}
          />

          <button type="submit">Continue</button>

          <p>
            <Link to={"/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
          <p>
           
          </p>
        </Form>
      </div>
    </>
  );
};

export default ForgotPass;
