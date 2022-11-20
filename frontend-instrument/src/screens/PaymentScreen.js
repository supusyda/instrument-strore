import React from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
const PaymentScreen = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler(e);
    
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>

          <div className="payment-container">
            <div className="radio-container">
              {props.paymentCode &&
                props.paymentCode.map((item) => {
                  return (
                    <div className="row flex-nowrap">
                      {" "}
                      <input
                        className="form-check-input"
                        type="radio"
                        value={item.keyMap}
                        name={item.type}
                        onClick={(e) => {
                          props.setPayment(e.target.value);
                        }}
                      />
                      <label className="form-check-label">{item.valueEN}</label>
                    </div>
                  );
                })}
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
