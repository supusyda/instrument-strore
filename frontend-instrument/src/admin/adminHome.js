import React from "react";
import "./adminHome.css";
import AppLayout from "../components/adminLayout/layout";
import Sidebar from "../components/sidebar/Sidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../screens/Login";
import Users from "../components/adminComponent/users";
import Product from "../components/adminComponent/product";
import Dashboard from "../components/adminComponent/dashboard"
import AdminHeader from "../components/adminComponent/adminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const admin = () => {
  return (
    <>
      <div className="admin-contain">
        <div className="left-content">
          {/* <AppLayout></AppLayout> */}
          <Sidebar></Sidebar>
        </div>
        <div className="right-content">
          <AdminHeader></AdminHeader>{" "}
          <Switch>
            <Route path="/admin/started" component={Dashboard} />
            <Route path="/admin/product" component={Product} />
            <Route path="/admin/user" component={Users} />
            <Route path="/admin/product" component={Login} />
          </Switch>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </>
  );
};

export default admin;
