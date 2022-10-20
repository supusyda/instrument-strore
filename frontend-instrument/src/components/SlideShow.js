import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";

const Slideshow = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="container space-bottom">
            <Slider {...settings}>

                <div className="slider-item1">
                    
                </div>
                <div className="slider-item1">
                    
                </div>
                <div className="slider-item1">
                    
                </div>
                <div className="slider-item1">
                    
                </div>
                <div className="slider-item1">
                    
                </div>
                <div className="slider-item1">
                    
                </div>
            </Slider>
        </div>

    )
}

export default Slideshow;