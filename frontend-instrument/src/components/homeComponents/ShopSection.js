import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import products from "../../data/Products";
import { getAllInstrument } from "../../services/instrumentService";
import useFetch from "../../customize/useFetch";

const ShopSection = () => {
  let [instruments, setInstruments] = useState([]);
  let [res, setRes] = useState([]);
  let [loading, setLoading] = useState(true);
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
                {products &&
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
