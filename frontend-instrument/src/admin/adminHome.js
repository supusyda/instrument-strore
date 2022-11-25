import React from "react";
import "./adminHome.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppLayout from "../components/adminLayout/layout";
import Sidebar from "../components/sidebar/Sidebar";
import Login from "../screens/Login";
import Users from "../components/adminComponent/users";
import Product from "../components/adminComponent/product";
import Dashboard from "../components/adminComponent/dashboard";
import AdminHeader from "../components/adminComponent/adminHeader";
import Blog from "../components/adminComponent/Blog"


const admin = () => {
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

export default admin;
