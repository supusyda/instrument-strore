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
    return () => {};
  }, []);
  return (
    <>
      {console.log(instruments)}
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {instruments &&
                  instruments.map((instrument) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={instrument.id}
                    >
                      <div className="border-product">
                        <Link to={`/products/${instrument.id}`}>
                          <div className="shopBack">
                            <img src="/images/5.png"/>
                          </div>
                        </Link>

                        <div className="shoptext">
                          <p>
                            <Link to={`/products/${instrument.id}`}>
                              {instrument.name}
                            </Link>
                          </p>

                          {/* <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                         */}
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
