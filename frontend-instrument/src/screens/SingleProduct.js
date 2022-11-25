import React, { useEffect, useState } from "react";
import Header from "./../components/Header";

import { Link, useParams } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import products from "../data/Products";
import { getAllInstrument } from "../services/instrumentService";

import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import LikeButtonCompoent from "../components/homeComponents/likes";
const SingleProduct = ({ match }) => {
  const history = useHistory();
  const cookies = new Cookies();
  const { id } = useParams();
  const product = products.find((p) => String(p._id) === id);
  let [instrument, setInstrument] = useState([]);
  let [islogin, setIsLogin] = useState(false);
  let [loading, setLoading] = useState(true);
  let [number, setNumber] = useState(1);
  let handleInput = (number) => {
    if (instrument.inStock - number < 0) {
      alert("not enough in stock");
    } else {
      setNumber(number);
    }
  };
  let handleAddToCart = () => {
    if (cookies.get("cartItemID")) {
      const cartItemIDCookie = cookies.get("cartItemID");

      if (match.params.id in cartItemIDCookie) {
        cartItemIDCookie[match.params.id] =
          Number(cartItemIDCookie[match.params.id]) + Number(number);
      } else {
        cartItemIDCookie[match.params.id] = 1;
      }
      const cartItemID = cartItemIDCookie;
      cookies.set("cartItemID", cartItemID, { path: "/" });
      console.log("cartItemID", cookies.get("cartItemID"));
    } else {
      let emtyArr = [];
      emtyArr[match.params.id] = number;
      cookies.set("cartItemID", emtyArr, { path: "/" });
      console.log(cookies.get("cartItemID"));
    }
    history.push("/cart");
  };
  useEffect(() => {
    let data = async () => {
      try {
        let respones = await getAllInstrument(match.params.id);

        setLoading(false);
        setInstrument(respones.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();

    return () => {};
  }, []);

  return (
    <>
      {console.log(instrument)}
      <Header setIsLogin={setIsLogin} />
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <div
                style={{
                  backgroundImage: `url(${
                    instrument.image ? instrument.image : ""
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{instrument.name}</div>
              </div>

              <p>
                {instrument.musicalInstrumentDetail
                  ? instrument.musicalInstrumentDetail.description
                  : ""}
              </p>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>

                  <span>{instrument.price}VNĐ</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {instrument.inStock > 0 ? (
                    <span>In Stock : {instrument.inStock}</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Like</h6>
                  {console.log(instrument)}
                  {/* {console.log(instrument)}
                  {instrument && (
                    <LikeButtonCompoent
                      inittialState={instrument.interact.likes}
                    ></LikeButtonCompoent>
                  )} */}
                  {instrument && instrument.interact && (
                    <LikeButtonCompoent
                      interact={instrument.interact}
                      instrumentID={instrument.id}
                    ></LikeButtonCompoent>
                  )}
                  {/* <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                  /> */}
                </div>
                {instrument.inStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <input
                        type="text"
                        defaultValue={number}
                        value={number}
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
                          handleInput(e.target.value);
                        }}
                      ></input>
                    </div>

                    <button
                      className="round-black-btn"
                      onClick={() => {
                        handleAddToCart();
                      }}
                    >
                      Add To Cart
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select>
                        <option key={0} value={0}>
                          {0}
                        </option>
                      </select>
                    </div>
                    <button className="round-black-btn ">Out of Stock</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5">
          {/* <div className="col-md-6">
            <h6 className="mb-3">REVIEWS</h6>
            <Message variant={"alert-info mt-3"}>No Reviews</Message>
            <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
              <strong>Admin</strong>
              <Rating />
              <span>dd/mm/yy</span>
              <div className="alert alert-info mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </div>
            </div>
          </div> */}
          <div className="col-md-12">
            <h6>WRITE A CUSTOMER REVIEW</h6>
            <div className="my-4"></div>

            <form>
              <div className="my-4">
                <strong>Rating</strong>
                <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="my-4">
                <strong>Comment</strong>
                <textarea
                  row="3"
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                ></textarea>
              </div>
              <div className="my-3">
                <button className="col-12 bg-black border-0 p-3 rounded text-white">
                  SUBMIT
                </button>
              </div>
            </form>
            {islogin === true ? (
              ""
            ) : (
              <div className="my-3">
                <Message variant={"alert-warning"}>
                  Please{" "}
                  <Link to="/login">
                    " <strong>Login</strong> "
                  </Link>{" "}
                  to write a review{" "}
                </Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
