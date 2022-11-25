import React, { useEffect } from "react";
import "./adminHome.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppLayout from "../components/adminLayout/layout";
import Sidebar from "../components/sidebar/Sidebar";

import { Switch, Route } from "react-router-dom";

import Login from "../screens/Login";
import Users from "../components/adminComponent/users";
import Product from "../components/adminComponent/product";
import Dashboard from "../components/adminComponent/dashboard";
import AdminHeader from "../components/adminComponent/adminHeader";
import Blog from "../components/adminComponent/Blog"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";

const Admin = () => {
  const cookies = new Cookies();
  const history = useHistory();

  useEffect(() => {
    if (cookies.get("token")) {
      let tokenData = jwtDecode(cookies.get("token"));
      if (tokenData.position !== "R1") {
        history.push("/");
      }
    }
  }, []);

  return (
    <>
      <div className="admin-contain">
        <AdminHeader></AdminHeader>{" "}
        <div className="left-content">
          <Sidebar></Sidebar>
        </div>
        <div className="right-content">
        <Switch>
          <Route path="/admin/started" component={Dashboard} />
          <Route path="/admin/product" component={Product} />
          <Route path="/admin/user" component={Users} />
          <Route path="/admin/blog" component={Blog} />
        </Switch>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default Admin;
