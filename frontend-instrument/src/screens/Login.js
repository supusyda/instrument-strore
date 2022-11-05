import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { Form } from "reactstrap";
import { login } from "../services/userService";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
const Login = () => {
  const cookies = new Cookies();

  window.scrollTo(0, 0);
  let [userData, setUserData] = useState({
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
      let res = await login(data);
      console.log(res);
      let accessToken = res.data.data.accessToken;
      let refreshToken = res.data.data.refreshToken;
      let userID = res.data.data.userID;
      console.log(refreshToken);
      cookies.set("token", accessToken, { path: "/" });
      cookies.set("refresh", refreshToken, { path: "/" });
      cookies.set("userID", userID, { path: "/" });

      // Pacman
      alert("success Register");
      history.push("/");
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
  return (
    <>
      {/* <Header /> */}
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
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              handleInput("password", e.target.value);
            }}
          />
          <button type="submit">Login</button>
          <p>
            <Link to={"/register"}>Create Account</Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
