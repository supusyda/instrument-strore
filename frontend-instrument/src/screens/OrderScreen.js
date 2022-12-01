import React from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useFetch from "../customize/useFetch";
import { useState } from "react";
import { useEffect } from "react";
const OrderScreen = (props) => {
  let [order, setOrder] = useState(null);
  let { res, loading } = useFetch(
    `http://localhost:8080/api/receipt/getDetail?receiptID=${props.receiptDetailID}`
  );
  useEffect(() => {
    if (res) {
      setOrder(res.data);
      console.log(res);
    }
  }, [res]);

  return (
    <>
      {order && (
        <div className="container">
          <div className="row order-detail">
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
              <div className="row">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Customer</strong>
                  </h5>
                  <p>Admin</p>
                  <p>
                    <a href={"#"}>{props.userData.email}</a>
                  </p>
                </div>
                {order.status === "S2" && (
                  <div className="paid-status  bg-secondary p-1 col-12">
                    <p className="text-white text-center">Pending</p>
                  </div>
                )}
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
                    Pay method: {order.payment === "PAY1" ? "Cash" : "Paypal"}
                  </p>
                </div>
                {order.status === "S3" && (
                  <div className="paid-status p-1 col-12">
                    <p className="text-white text-center">Done</p>
                  </div>
                )}
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
                  <p>Address: {order.deliverAdress}</p>
                </div>
                {order.status === "S4" && (
                  <div className="deliveried-status bg-danger p-1 col-12">
                    <p className="text-white text-center">Cancel</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {order.ReceiptDetails.map((item) => {
                return (
                  <div className="order-product row">
                    <div className="col-md-3 col-6">
                      <img src={item.instrument.image} alt="product" />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/`}>
                        <h6>{item.instrument.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.amount}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                      <h4>SUBTOTAL</h4>
                      <h6>${item.money}</h6>
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
                      <strong>Total</strong>
                    </td>
                    <td>$ {order.totalMoney}</td>
                  </tr>
                </tbody>
              </table>

              <div className="col-12"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
