import React from "react";
import { Link } from "react-router-dom";

const adminHeader = () => {
  return (
    <div>
      <div className="header-menu">
        <div className="container ">
          <div className="d-flex space-between">
            <ul className="nav-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link>Product</Link>
              </li>
              <li>
                <Link to="/contactinfo">Contact</Link>
              </li>
            </ul>
            <ul className="nav-menu">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminHeader;
