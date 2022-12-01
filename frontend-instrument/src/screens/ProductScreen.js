import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ShopSection from "../components/homeComponents/ShopSection";
import { getWithAction } from "../services/instrumentService";
import Filter from "../components/productComponent/filterComponent";
const ProductScreen = ({ match }) => {
  let [cartItem, setCartItem] = useState(0);
  let [islogin, setIsLogin] = useState(false);
  let [totalItem, setTotalItem] = useState(0);
  let [query, setQuery] = useState(match.params.q);
  let [dataFromFilter, setDataFromFilter] = useState({});

  useEffect(() => {
    let data = async () => {
      try {
        let datasend = { action: "total" };
        if (match.params.q) {
          setQuery(match.params.q);
          datasend.query = match.params.q;
        } else {
          setQuery(match.params.q);
        }
        let respones = await getWithAction(datasend);
        console.log(respones);
        setTotalItem(respones.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [match.params.q]);

  let addToCart = (number) => {
    setCartItem(cartItem + number);
  };
  const action = {
    new: "new",
    like: "like",
    all: "ALL",
    query: "query",
  };
  const sectionName = {
    new: "NEW PRODUCT",
    like: "MOST LIKE PRODUCT",
    all: "OUR PRODUCT",
  };
  return (
    <div>
      <Header cartItem={cartItem} setIsLogin={setIsLogin} />
      <Filter setDataFromFilter={setDataFromFilter}></Filter>
      (
      <ShopSection
        addToCart={addToCart}
        islogin={islogin}
        action={query ? action.query : action.all}
        query={query}
        sectionName={sectionName.all}
        isPaging={true}
        // totalItem={totalItem}
        dataFromFilter={dataFromFilter}
      />
      ){/* <h1 style={{ textAlign: "center" }}>0 FOUND</h1> */}
      <Footer />
    </div>
  );
};

export default ProductScreen;
