import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import useFetch from "../customize/useFetch";
import { logout } from "../services/userService";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const cookies = new Cookies();
  let history = useHistory();
  let [userID, setUserID] = useState(cookies.get("userID"));
  let [cartItem, setCartItem] = useState(
    cookies.get("cartItemID") ? cookies.get("cartItemID") : []
  );
  let [userData, setUserData] = useState(null);
  // let [cartItem,setCartItem]=useState([]);
  let { res, refesh } = useFetch(
    `http://localhost:8080/api/user/get?userID=${userID}`
  );
  const getItemVolunm = (arrItem) => {
    let sum = 0;
    if (arrItem) {
      arrItem.map((item) => {
        if (item) sum += 1;
      });
    }
    if (props.cartItem) return sum + props.cartItem;
    return sum;
  };
  if (props.froceRerender) {
    if (props.updateSuccess === true) {
      refesh();
      props.froceRerender();
    }
  }
  let logoutUser = async () => {
    if (userData) {
      let res = await logout(userData);
      setUserData(null);
      cookies.remove("userID");
      cookies.remove("refresh");
      cookies.remove("token");
      if (props.setIsLogin) {
        props.setIsLogin(false);
      }
      console.log(cookies.get("token"));
      history.push("/login");
    }
  };
  useEffect(() => {
    if (props.getUserFormHeader) {
      props.getUserFormHeader(res.data);
    }
    if (props.setIsLogin && res.data) {
      props.setIsLogin(true);
    }
    setUserData(res.data);

    return () => {};
  }, [res]);

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
                <p>Hello, guy</p>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="" onClick={() => logoutUser()}>
                  logut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header ">
        <div className="container ">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <div className="shadow-sm p-3 mb-5 bg-body rounded">
                      <img alt="logo" src="/images/logo.png" />
                    </div>
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-user"></i>
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>

                      <Link className="dropdown-item" to="#">
                        Logout
                      </Link>
                    </div>
                  </div>
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">4</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                    />
                    <button type="submit" className="search-button">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img
                    alt="logo"
                    src="/images/logo.png"
                    className="shadow-sm bg-body rounded rounded-circle"
                  />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                  />
                  <button type="submit" className="search-button">
                    Search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                <div className="btn-group">
                  {userData ? (
                    <div
                      type="button"
                      className="name-button  rounded-circle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{
                        backgroundImage: `url(${
                          userData.image ? userData.image : ""
                        })`,
                        // background: "round",
                        backgroundSize: "cover",
                        height: "100px",
                        width: "100px",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  ) : (
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Guest
                    </button>
                  )}

                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>

                    <Link className="dropdown-item" to="#">
                      Logout
                    </Link>
                  </div>
                </div>

                <Link to="/cart" className="cart-pc-item">
                  <i class="fas fa-shopping-cart"></i>
                  <span className="badge">{getItemVolunm(cartItem)}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
