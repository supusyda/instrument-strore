import { useEffect, useRef, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "./sidebar.css";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/admin/",
    section: "",
  },
  {
    display: "Getting Started",
    icon: <i className="bx bx-star"></i>,
    to: "/admin/started",
    section: "started",
  },
  {
    display: "Product",
    icon: <i className="bx bx-calendar"></i>,
    to: "/admin/product",
    section: "calendar",
  },
  {
    display: "User",
    icon: <i className="bx bx-user"></i>,
    to: "/admin/user",
    section: "user",
  },
  {
    display: "Blog",
    icon: <i className="bx bx-receipt"></i>,
    to: "/admin/order",
    section: "order",
  },
];

const Sidebar = () => {
  const sidebarRef = useRef();
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#fff" : "",
    backgroundColor: isActive ? "#0d6efd" : "",
  });
  return (
    <div className="sidebar ">
      <div className="sidebar__logo">Animate</div>
      <div ref={sidebarRef} className="sidebar__menu">
        {sidebarNavItems.map((item, index) => (
          <NavLink
            to={item.to}
            key={index}
            style={navLinkStyle}
            className="sidebar__menu__item"
            exact={index===0 ? true : false}
          >
            <div className="sidebar__menu__item__icon">{item.icon}</div>
            <div className="sidebar__menu__item__text">{item.display}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
