import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import useFetch from "../customize/useFetch";
import { getSpecificInstrument } from "../services/instrumentService";
import Cookies from "universal-cookie";

const CartScreen = () => {
  const cookies = new Cookies();

  let [recieptData, setRecieptData] = useState(
    cookies.get("cartItemID") ? cookies.get("cartItemID") : []
  );
  let [itemInCart, setItemInCart] = useState(null);
  let totalMoney = (itemInCart) => {
    let sum = 0;
    itemInCart.map((item) => {
      sum = sum + item.numberBuy * item.price;
    });
    return sum;
  };
  let checkItemIncart = (arr) => {
    let check = false;
    arr.map((item) => {
      if (item !== null) {
        check = true;
      }
    });
    return check;
  };
  let handleInput = (index, newValue) => {
    let tempItemInCart = [...itemInCart];

    tempItemInCart[index].numberBuy = Number(newValue);
    let indexRecietp = tempItemInCart[index].id;
    console.log("itemInCart", itemInCart);
    console.log(tempItemInCart);
    setItemInCart(tempItemInCart);
    let tempRecieptData = [...recieptData];
    tempRecieptData[indexRecietp] = Number(newValue);
    cookies.set("cartItemID", tempRecieptData, { path: "/" });
  };
  let handleDelete = async (itemID) => {
    let tempRecieptData = [...recieptData];
    let tempItemInCart = [...itemInCart];
    tempRecieptData[itemID] = null;
    setRecieptData(tempRecieptData);
    cookies.set("cartItemID", tempRecieptData, { path: "/" });
    let newtempItemInCart = tempItemInCart.filter((item) => {
      return item.id !== itemID;
    });
    console.log(newtempItemInCart);
    setItemInCart(newtempItemInCart);
  };
  useEffect(() => {
    let data = async () => {
      try {
        let instrumentIDs = { ids: recieptData };

        let respones = await getSpecificInstrument(instrumentIDs);

        setItemInCart(respones.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);

  return (
    <>
      {console.log()}
      <Header />
      {/* Cart */}
      <div className="container">

       {itemInCart && !checkItemIncart(itemInCart) ? (
          

        {/* <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div> */}
        <div className=" alert alert-info text-center mt-3">
          Total Cart Products
          <Link className="text-success mx-2" to="/cart">
            (4)
          </Link>
        </div>
        {/* cartiterm */}
        <div className="cart-iterm row">
          <div className="remove-button d-flex justify-content-center align-items-center">
            <i className="fas fa-times"></i>
          </div>
          <div className="cart-image col-md-3">
            <img src="/images/1.png" alt="nike" />
          </div>
          <div className="cart-text col-md-5 d-flex align-items-center">
            <Link to="#">
              <h4>Nike Girls Shoe</h4>

            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({itemInCart && itemInCart.length})
              </Link>
            </div>
            {/* cartiterm */}
            {itemInCart && itemInCart.length > 0
              ? itemInCart.map((item, index) => {
                  return (
                    <div className="cart-iterm row" key={index}>
                      <div
                        className="remove-button d-flex justify-content-center align-items-center"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fas fa-times"></i>
                      </div>
                      <div className="cart-image col-md-3">
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
                      <div className="cart-text col-md-5 d-flex align-items-center">
                        <Link to="#">
                          <h4>{item.name}</h4>
                        </Link>
                      </div>
                      <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                        <h6>QUANTITY</h6>

                        <input
                          type="text"
                          defaultValue={item.numberBuy}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            handleInput(index, e.target.value);
                          }}
                        ></input>
                      </div>
                      <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                        <h6>SUBTOTAL</h6>
                        <h4>${Number(item.numberBuy * item.price)}</h4>
                      </div>
                    </div>
                  );
                })
              : ""}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">
                ${itemInCart && itemInCart.length > 0 && totalMoney(itemInCart)}
              </span>
            </div>
          </>
        )}

        <hr />
        <div className="cart-buttons d-flex align-items-center row">
          <Link to="/" className="col-md-6 ">
            <button>Continue To Shopping</button>
          </Link>
          <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
            <button>
              <Link to="/shipping" className="text-white">
                Checkout
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
