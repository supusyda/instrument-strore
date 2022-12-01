import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Form } from "reactstrap";
import { forgot } from "../services/userService";
import { createUser } from "../services/userService";
import { useHistory } from "react-router-dom";
import { updatePass } from "../services/userService";
import jwtDecode from "jwt-decode";

const ResetPass = ({ match }) => {
  const history = useHistory();

  let [userData, setUserData] = useState({
    email: "",
  });
  let [isVerify, setIsVerify] = useState(false);
  useEffect(() => {
    console.log(match);
    let verify = jwtDecode(match.params.token);
    if (verify) {
      setUserData({ email: verify.email, id: verify.id, changepass: true });
      setIsVerify(true);
    }
    console.log(verify);
  }, []);

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
      let res = await updatePass(userData);
      if (res.data.errCode == 0) {
        alert("success change pass");
        history.push("/login");
      } else {
        alert("something went wrong");
      }
    }
  };

  let handleInput = (indexKey, data) => {
    let tempData = { ...userData };
    tempData[indexKey] = data;
    setUserData(tempData);
    console.log(tempData);
  };

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {isVerify && (
          <Form className="Login col-md-8 col-lg-4 col-11" onSubmit={onSubmit}>
            <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => {
                handleInput("password", e.target.value);
              }}
            />
            {/* <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => {
                handleInput("email", e.target.value);
              }}
            /> */}
            <button type="submit">Continue</button>

            <p>
              <Link to={"/login"}>
                I Have Account <strong>Login</strong>
              </Link>
            </p>
          </Form>
        )}
      </div>
    </>
  );
};

export default ResetPass;
