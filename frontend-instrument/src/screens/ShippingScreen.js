import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  let [userData, setUserData] = useState(null);
  const getUserFormHeader = (dataFromHeader) => {
    setUserData(dataFromHeader);
    console.log(userData);
  };
  return (
    <>
      <Header getUserFormHeader={getUserFormHeader} />
      <div className="container d-flex justify-content-center align-items-center login-center">
        {userData ? (
          <form
            className="Login col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
          >
            <h6>DELIVERY ADDRESS</h6>
            <input
              type="text"
              placeholder="Enter address"
              defaultValue={userData.address}
            />
            <input type="text" placeholder="Enter city" />
            <input type="text" placeholder="Enter postal code" />
            <input type="text" placeholder="Enter country" />
            <button type="submit">
              <Link to="/payment" className="text-white">
                Continue
              </Link>
            </button>
          </form>
        ) : (
          <h6>LOGIN TO CONTINUTE</h6>
        )}
      </div>
    </>
  );
};

export default ShippingScreen;
