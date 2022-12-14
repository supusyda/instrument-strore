import React from "react";
import { Link } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PlaceOrderScreen = (props) => {
  const shipMoney = 20;
  const placeOrderHandler = (e) => {
    e.preventDefault();
    props.handlePlaceOrderSubmit();
  };
  let totalMoney = (itemInCart) => {
    let sum = 0;
    itemInCart.map((item) => {
      sum = sum + item.amount * item.price;
    });
    return sum;
  };
  return (
    <>
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{props.userData.firstName}</p>
                <p>{props.userData.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: Tanzania</p>
                <p>
                  Pay method:{" "}
                  {props.paymentCode.map((item) => {
                    if (item.keyMap == props.payment) return item.valueEN;
                    else {
                      return "";
                    }
                  })}
                </p>
              </div>
            </div>
          </div>
          {/* 3 */}

          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>{props.userData.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {/* <Message variant="alert-info mt-5">Your cart is empty</Message> */}
            {props.itemIncart &&
              props.itemIncart.map((item) => {
                return (
                  <div className="order-product row">
                    <div className="col-md-3 col-6">
                      <div
                        style={{
                          backgroundImage: `url(${
                            item.image ? item.image : ""
                          })`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={"/"}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.amount}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>${Number(item.amount * item.price)}</h6>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>${totalMoney(props.itemIncart)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>${totalMoney(props.itemIncart) + shipMoney}</td>
                </tr>
              </tbody>
            </table>
            {props.payment === "PAY1" ? (
              <button type="submit" onClick={placeOrderHandler}>
                <div className="text-white">PLACE ORDER</div>
              </button>
            ) : (
              <div className="" style={{ width: "100%" }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalMoney(props.itemIncart).toString(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(function (details) {
                     

                      props.handlePlaceOrderSubmit();
                    });
                  }}
                />
              </div>
            )}

            {/* <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
