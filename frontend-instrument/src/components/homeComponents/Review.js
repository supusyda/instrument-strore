import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Testimonials extends Component {
    render() {
        return (
            <>
                <div className="heading-about">
                    <h2>Customer's Testimonials</h2>
                </div>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={6100}
                >
                    <div className="review">
                        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" />
                        <div className="myCarousel">
                            <h3>Customer</h3>
                            <h4>Buy Guitar</h4>
                            <p>
                                It's very beautifull and good
                            </p>
                        </div>
                    </div>

                    <div>
                        <img src="data:image/jpeg;base64,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" />
                        <div className="myCarousel">
                            <h3>Customer</h3>
                            <h4>Buy Piano</h4>
                            <p>
                                I can play easy
                            </p>
                        </div>
                    </div>

                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" />
                        <div className="myCarousel">
                            <h3>Customer</h3>
                            <h4>Buy Drum</h4>
                            <p>
                                That sound so great
                            </p>
                        </div>
                    </div>
                </Carousel>
            </>
        );
    }
}