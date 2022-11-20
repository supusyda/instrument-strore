import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ShopSection from "../components/homeComponents/ShopSection";

const ProductScreen = () => {
    window.scrollTo(0, 0);
    return (
        <div>
            <Header />
            <ShopSection />
            <Footer />
        </div>
    )
}

export default ProductScreen;