import React, { useState } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import SlideShow from "../components/SlideShow";
import AboutSection from "../components/homeComponents/AboutSection";
import Review from "../components/homeComponents/Review";
const HomeScreen = () => {
  let [cartItem, setCartItem] = useState(0);
  let [islogin, setIsLogin] = useState(false);
  let addToCart = (number) => {
    setCartItem(cartItem + number);
   
  };
  const action = {
    new: "new",
    like: "like",
  };
  const sectionName = {
    new: "NEW PRODUCT",
    like: "MOST LIKE PRODUCT",
  };

  return (
    <div>
      <Header cartItem={cartItem} setIsLogin={setIsLogin} />
      <SlideShow />
      <AboutSection />

      <ShopSection
        addToCart={addToCart}
        islogin={islogin}
        action={action.new}
        sectionName={sectionName.new}
      />
      <br />
      <ShopSection
        addToCart={addToCart}
        islogin={islogin}
        action={action.like}
        sectionName={sectionName.like}
      />
      <CalltoActionSection />
      <Review />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
