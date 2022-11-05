import { useEffect, useRef, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "./sidebar.css";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i class="fas fa-chart-line"></i>,
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
    icon: <i class="fas fa-guitar"></i>,
    to: "/admin/product",
    section: "calendar",
  },
  {
    display: "User",
    icon: <i class="fas fa-users"></i>,
    to: "/admin/user",
    section: "user",
  },
  {
    display: "Blog",
    icon: <i class="fab fa-blogger-b"></i>,
    to: "/admin/order",
    section: "order",
  },
];

const Sidebar = () => {
  let [isOpen, setIsOpen] = useState(true);

  const sidebarRef = useRef();

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav>
        <input
          type="checkbox"
          name="open"
          id="open"
          onClick={() => {
            handleSidebar();
          }}
        />
        <label for="open" class="open">
          <i class="fas fa-bars"></i>
        </label>
        {isOpen && (
          <div className="sidebar">
            <div className="sidebar__logo"></div>
            <div ref={sidebarRef} className="sidebar__menu">
              {sidebarNavItems.map((item, index) => (
                <NavLink
                  to={item.to}
                  key={index}
                  className="sidebar__menu__item"
                  exact={index === 0 ? true : false}
                >
                  <div className="sidebar__menu__item__icon">{item.icon}</div>
                  <div className="sidebar__menu__item__text">
                    {item.display}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
