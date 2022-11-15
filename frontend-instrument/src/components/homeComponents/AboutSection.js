import React from "react";

const AboutSection = () => {
  return (
    <div className="aboutSection container">
        <div className="about-heading">
            <h2>Why Shop With Us</h2>
        </div>
      <div className="row">
        <div className="col-12 col-md-4 about-Box">
          <div className="box-about">
            <div className="about-image">
            <i class="fal fa-truck"></i>
            </div>
            <h5>Fast Delivery</h5>
            <p>Delivery within 24 hours</p>
          </div>
        </div>
        <div className="col-12 col-md-4 about-Box">
          <div className="box-about">
            <div className="about-image">
            <i class="fal fa-dollar-sign"></i>
            </div>
            <h5>Free Shipping</h5>
            <p>Free shipping in location</p>
          </div>
        </div>
        <div className="col-12 col-md-4 about-Box">
          <div className="box-about">
            <div className="about-image">
            <i class="fal fa-award"></i>
            </div>
            <h5>Best Quality</h5>
            <p>All of products are quality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
