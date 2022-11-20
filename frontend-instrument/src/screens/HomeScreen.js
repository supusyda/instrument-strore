import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import SlideShow from "../components/SlideShow";
import AboutSection from "../components/homeComponents/AboutSection";
import Review from "../components/homeComponents/Review";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <SlideShow />
      <AboutSection />
      <ShopSection />
      <CalltoActionSection />
      <Review />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
