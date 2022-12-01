import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PaymentScreen from "./PaymentScreen";
import PlaceOrderScreen from "./PlaceOrderScreen";
import Cookies from "universal-cookie";
import { getSpecificInstrument } from "../services/instrumentService";
import { getPaymentCode, createReceipt } from "../services/recieptService";
import { useHistory } from "react-router-dom";
import Done from "./done";
const ShippingScreen = () => {
  const cookies = new Cookies();
  let [paymentCode, setPaymentCode] = useState();
  let [userData, setUserData] = useState(null);
  let [doneStep, setDoneStep] = useState({
    deliver: false,
    payment: false,
    alldone: false,
  });
  let [payment, setPayment] = useState(null);
  let [itemIncart, setItemIncart] = useState();
  const history = useHistory();
  let [recieptData, setRecieptData] = useState(
    cookies.get("cartItemID") ? cookies.get("cartItemID") : []
  );
  let handleInputDeliver = (index, value) => {
    let temp = { ...userData };
    temp[index] = value;
    console.log(temp);
    setUserData(temp);
  };
  let handlePlaceOrderSubmit = async () => {
    let userID = userData.id;
    let address = userData.address;
    let itemCartDatabase = itemIncart.map((item) => {
      return {
        amount: item.amount,
        instrumentID: item.id,
        money: Number(item.amount * item.price),
      };
    });

    let totalMoney = () => {
      let sum = 0;
      itemIncart.map((item) => {
        sum = sum + Number(item.amount * item.price);
      });
      return sum;
    };
    let paymentKeyMap = payment;

    let sendToDatabase = {
      userID: userID,
      totalMoney: totalMoney(),
      payment: paymentKeyMap,
      deliverAdress: address,
      details: itemCartDatabase,
      status: "S2",
    };
    let res = await createReceipt(sendToDatabase);
    console.log(res);
    if (res.data.errCode == 0) {
      cookies.remove("cartItemID", { path: "/" });
      let temp = { ...doneStep, alldone: true };
      setDoneStep(temp);
      if (temp.deliver === true && temp.payment === true && temp.alldone) {
        console.log(`cookies.remove("cartItemID");`);
        cookies.remove("cartItemID");
      }
      // history.push("/");
    }
  };
  const checkValidate = (data) => {
    for (let k in data) {
      if (data[k] === "") {
        return false;
      }
    }
    return true;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.address && userData.phoneNumber) {
      setDoneStep({ ...doneStep, deliver: true });
      console.log(doneStep);
    } else {
      alert("Fill All info");
    }
    if (payment) {
      setDoneStep({ ...doneStep, payment: true });
    } else {
    }
  };

  const getUserFormHeader = (dataFromHeader) => {
    setUserData(dataFromHeader);
  };
  useEffect(() => {
    let data = async () => {
      try {
        let instrumentIDs = { ids: recieptData };
        let respones = await getSpecificInstrument(instrumentIDs);
        let respones2 = await getPaymentCode();
        setPaymentCode(respones2.data.data);
        setItemIncart(respones.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
    return () => {};
  }, []);

  return (
    <>
      {console.log("paymentCode", paymentCode)}
      <Header getUserFormHeader={getUserFormHeader} />
      <div className="container d-flex justify-content-center align-items-center login-center">
        {userData ? (
          <>
            {" "}
            {doneStep.deliver === false && doneStep.payment === false && (
              <form
                className="Login col-md-8 col-lg-4 col-11"
                onSubmit={submitHandler}
              >
                <h6>DELIVERY ADDRESS</h6>
                <input
                  type="text"
                  placeholder="Enter address"
                  defaultValue={userData.address}
                  // value={deliverAddress.address}
                  onChange={(e) => {
                    handleInputDeliver("address", e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  defaultValue={userData.phoneNumber}
                  // value={deliverAddress.phoneNumber}
                  onChange={(e) => {
                    handleInputDeliver("phoneNumber", e.target.value);
                  }}
                />
                <button type="submit">Continue</button>
              </form>
            )}
            {doneStep.deliver === true && doneStep.payment === false && (
              <PaymentScreen
                setPayment={setPayment}
                submitHandler={submitHandler}
                paymentCode={paymentCode}
              ></PaymentScreen>
            )}
            {doneStep.deliver === true &&
              doneStep.payment === true &&
              doneStep.alldone === false && (
                <PlaceOrderScreen
                  itemIncart={itemIncart}
                  payment={payment}
                  userData={userData}
                  paymentCode={paymentCode}
                  handlePlaceOrderSubmit={handlePlaceOrderSubmit}
                ></PlaceOrderScreen>
              )}
            {doneStep.alldone === true && <Done></Done>}
          </>
        ) : (
          <h6>LOGIN TO CONTINUTE</h6>
        )}
      </div>
    </>
  );
};

export default ShippingScreen;
