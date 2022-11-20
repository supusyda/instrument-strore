import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="heading-about">
        <h2>Our Contact</h2>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Call Us</h5>
            <p>0963 176 851</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Headquarter</h5>
            <p>Ho Chi Minh City</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i class="fas fa-envelope"></i>
            </div>
            <h5>Email</h5>
            <p>1951120@sv.ut.edu.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
