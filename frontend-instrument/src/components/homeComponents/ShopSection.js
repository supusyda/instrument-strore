import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import products from "../../data/Products";
// import { getAllInstrument } from "../../services/instrumentService";
import { getWithAction } from "../../services/instrumentService";
import Loading from "../LoadingError/Loading";
import Cookies from "universal-cookie";
const ShopSection = (props) => {
  const cookies = new Cookies();
  let [instruments, setInstruments] = useState([]);

  let [isloading, setisLoading] = useState(true);
  let [pagination, setPagination] = useState({
    onPage: 6,
    currentPage: 1,
  });
  const addToCartHead = (itemID) => {
    if (cookies.get("cartItemID")) {
      const cartItemIDCookie = cookies.get("cartItemID");
      if (itemID in cartItemIDCookie) {
        if (cartItemIDCookie[itemID] === null) {
          props.addToCart(1);
        }
        cartItemIDCookie[itemID] = Number(cartItemIDCookie[itemID]) + 1;
      } else {
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
  const handleOnPageChange = (newPage) => {
    let temp = { ...pagination, currentPage: newPage };
    setPagination(temp);
  };
  useEffect(() => {
    let data = async () => {
      try {
        let respones;
        if (props.isPaging) {
          console.log("props.action", props.action);
          let dataSend;
          if (props.action === "query") {
            dataSend = {
              action: props.action,
              pagination: { ...pagination },
              query: props.query,
            };
          } else {
            console.log("props.action", props.action);

            dataSend = { action: "paging", pagination: pagination };
          }

          respones = await getWithAction(dataSend);
        } else {
          let dataSend = { action: props.action };
          respones = await getWithAction(dataSend);
        }

        setisLoading(false);
        setInstruments(respones.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
    return () => {};
  }, [pagination, props.query, props.action]);
  return (
    <>
      {isloading === true ? (
        <Loading></Loading>
      ) : (
        <div className="container">
          <div className="section">
            <div className="heading-products">
              <h2>{props.sectionName}</h2>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 article">
                <div className="shopcontainer row">
                  {instruments &&
                    instruments.map((instrument) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={instrument.id}
                      >
                        <div className="border-product shadow p-3 mb-5 bg-body rounded">
                          <Link to={`/products/${instrument.id}`}>
                            <div className="shopBack">
                              <div className="option-container">
                                <div className="options">
                                  {!props.islogin ? (
                                    <Link className="option-4" to={"/login"}>
                                      Login To Buy
                                    </Link>
                                  ) : instrument.inStock > 0 ? (
                                    <>
                                      {" "}
                                      <button
                                        className="option-1"
                                        onClick={() => {
                                          addToCartHead(instrument.id);
                                        }}
                                      >
                                        Add To Cart
                                      </button>
                                      <Link
                                        className="option-2"
                                        to={"/cart"}
                                        onClick={() => {
                                          addToCartHead(instrument.id);
                                        }}
                                      >
                                        Buy Now
                                      </Link>
                                    </>
                                  ) : (
                                    <div className="option-3">Out Of Stock</div>
                                  )}
                                </div>
                              </div>
                              <div
                                className="img-box"
                                style={{
                                  backgroundImage: `url(${
                                    instrument.image ? instrument.image : ""
                                  })`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "100%",
                                }}
                              >
                                <div></div>
                              </div>
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${instrument.id}`}>
                                {instrument.name}
                              </Link>
                            </p>
                            {instrument.interact && (
                              <Rating
                                like={`${instrument.interact.likes} reviews`}
                                dislike={`${instrument.interact.dislikes} reviews`}
                              />
                            )}

                            <h3>{instrument.price}USD</h3>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Pagination */}
                  {props.isPaging && (
                    <Pagination
                      onPageChange={handleOnPageChange}
                      pagination={pagination}
                      totalRow={props.totalItem}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopSection;
