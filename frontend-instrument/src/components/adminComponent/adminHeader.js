import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import useFetch from "../../customize/useFetch";
import { useHistory } from "react-router-dom";
import { logout } from "../../services/userService";

const AdminHeader = () => {
  const cookies = new Cookies();
  let history = useHistory();

  let [userID, setUserID] = useState(cookies.get("userID"));
  let [userData, setUserData] = useState(null);
  let { res, refesh } = useFetch(
    `http://localhost:8080/api/user/get?userID=${userID}`
  );
  useEffect(() => {
    setUserData(res.data);
    return () => {};
  }, [res]);
  let logoutUser = async () => {
    if (userData) {
      let res = await logout(userData);
      if (res.data.errCode == 0) {
        setUserData(null);
        await cookies.remove("userID", { path: "/" });
        await cookies.remove("refresh", { path: "/" });
        await cookies.remove("token", { path: "/" });
        await cookies.remove("cartItemID", { path: "/" });
        history.push("/login");
      } else {
        alert("some thinng wrong");
      }
    }
  };
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
                <Link to="/shopsection/">Product</Link>
              </li>
            </ul>
            <ul className="nav-menu">
              <li onClick={() => logoutUser()}>
                <div>
                  <a>Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
