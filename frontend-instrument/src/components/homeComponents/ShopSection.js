import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import products from "../../data/Products";
import { getAllInstrument } from "../../services/instrumentService";
import useFetch from "../../customize/useFetch";
import Cookies from "universal-cookie";

const ShopSection = (props) => {
  const cookies = new Cookies();

  let [instruments, setInstruments] = useState([]);
  let [res, setRes] = useState([]);
  let [loading, setLoading] = useState(true);
  const addToCartHead = (itemID) => {
    if (cookies.get("cartItemID")) {
      const cartItemIDCookie = cookies.get("cartItemID");
      if (itemID in cartItemIDCookie) {
        if (cartItemIDCookie[itemID] === null) {
          props.addToCart(1);
        }
        cartItemIDCookie[itemID] = Number(cartItemIDCookie[itemID]) + 1;
      } else {
        console.log("why mot + 1");
        props.addToCart(1);
        cartItemIDCookie[itemID] = 1;
      }
      const cartItemID = cartItemIDCookie;
      cookies.set("cartItemID", cartItemID, { path: "/" });
      console.log("cartItemID", cookies.get("cartItemID"));
    } else {
      let emtyArr = [];
      emtyArr[itemID] = 1;
      props.addToCart(1);
      cookies.set("cartItemID", emtyArr, { path: "/" });
      console.log(cookies.get("cartItemID"));
    }
  };
  useEffect(() => {
    let data = async () => {
      try {
        let respones = await getAllInstrument("ALL");
        setRes(respones.data);
        setLoading(false);
        setInstruments(respones.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
    return () => { };
  }, []);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="heading-products">
            <h2>Our Products</h2>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {/* {products &&
                  products.map((product) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={product._id}
                    >
                      <div className="border-product shadow p-3 mb-5 bg-body rounded">
                        <Link to={`/products/${product._id}`}>
                          <div className="shopBack">
                            <div className="option-container">
                              <div className="options">
                                <Link className="option-1" to={"/cart"}>Add To Cart</Link>
                                <Link className="option-2" to={"/shipping"}>Buy Now</Link>
                              </div>
                            </div>
                            <div className="img-box">
                              <img src={product.image} />
                            </div>
                          </div>
                        </Link>

                        <div className="shoptext">
                          <p>
                            <Link to={`/products/${product._id}`}>
                              {product.name}
                            </Link>
                          </p>

                          <Rating
                            value={product.rating}
                            text={`${product.numReviews}`}
                          />

                          <h3>{product.price}VNĐ</h3>

                        </div>
                      </div>
                    </div>
                  ))} */}
                {instruments &&
                  instruments.map((instrument) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={instrument.id}
                    >
                      <div className="border-product shadow p-3 mb-5 bg-body rounded">
                        <Link to={`/products/${instrument.id}`}>
                          <div className="shopBack">
                            <div
                              style={{
                                backgroundImage: `url(${
                                  instrument.image ? instrument.image : ""
                                })`,
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                height: "100%",
                              }}
                            ></div>
                          </div>
                        </Link>

                        <div className="shoptext">
                          <p>
                            <Link to={`/products/${instrument.id}`}>
                              {instrument.name}
                            </Link>
                          </p>
                          {instrument.inStock > 0 ? (
                            <button
                              onClick={() => {
                                addToCartHead(instrument.id);
                              }}
                            >
                              Buy
                            </button>
                          ) : (
                            <button>Out Of Stock</button>
                          )}

                          <Rating
                            like={`${5} reviews`}
                            dislike={`${5} reviews`}
                          />

                          <h3>${instrument.price}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* Pagination */}
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
