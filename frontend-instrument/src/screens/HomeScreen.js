import React, { useState } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import SlideShow from "../components/SlideShow";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  let [cartItem, setCartItem] = useState(0);
  let [islogin, setIsLogin] = useState(false);

  let addToCart = (number) => {
    setCartItem(cartItem + number);
    console.log(number);
  };
  return (
    <div>
      <Header cartItem={cartItem} setIsLogin={setIsLogin} />
      <SlideShow />
      <ShopSection addToCart={addToCart} islogin={islogin} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
