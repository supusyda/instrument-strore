import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { Form } from "reactstrap";
import { createUser } from "../services/userService";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
const Register = () => {
  window.scrollTo(0, 0);
  const google = window.google;

  let [userData, setUserData] = useState({
    lastName: "",
    email: "",
    password: "",
  });
  const history = useHistory();
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
    let data = userData;
    console.log("data=>", data);
    if (checkValidate(data) === true) {
      data.roleCreate = "client";
      data.role = "R2";
      let res = await createUser(data);
      console.log(res);
      alert("success Register");
      history.push("/login");
    } else {
      alert("not full info");
    }
  };

  let handleInput = (indexKey, data) => {
    let tempData = userData;
    tempData[indexKey] = data;
    setUserData(tempData);
    console.log(tempData);
  };

  const handleRespone = async (respone) => {
    let userGoogleData = await jwtDecode(respone.credential);
    let temp = userData;
    temp.email = userGoogleData.email;
    temp.lastName = userGoogleData.given_name;
    // let toBase64 = await encodeImageFileAsURL(userGoogleData.picture);
    temp.roleCreate = "google";
    temp.role = "R2";
    console.log(temp);
    let res = await createUser(temp);
    console.log(res);
    alert("success Register");
    history.push("/login");
    console.log(userGoogleData);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "865988452655-41c4rohrrp90fc36u48178sibfakisqt.apps.googleusercontent.com",
      callback: handleRespone,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    return () => {};
  }, []);
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <Form className="Login col-md-8 col-lg-4 col-11" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => {
              handleInput("lastName", e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              handleInput("email", e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              handleInput("password", e.target.value);
            }}
          />

          <button type="submit">Register</button>
          <p id="signInDiv"></p>
          <p>
            <Link to={"/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Register;
