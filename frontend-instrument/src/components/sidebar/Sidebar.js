import { useEffect, useRef, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "./sidebar.css";

const sidebarNavItems = [
  {
    display: "Getting Started",
    icon: <i class="fas fa-star"></i>,
    to: "/admin/started",
    section: "started",
  },
  {
    display: "Receipt",
    icon: <i class="far fa-file-invoice-dollar"></i>,
    to: "/admin/receipts",
    section: "receipts",
  },
  {
    display: "Product",
    icon: <i class="fas fa-guitar"></i>,
    to: "/admin/product",
    section: "calendar",
  },
  {
    display: "Category",
    icon: <i class="fal fa-list-ul"></i>,
    to: "/admin/category",
    section: "category",
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
    to: "/admin/blog",
    section: "blog",
  },
];

const Sidebar = () => {
  let [isOpen, setIsOpen] = useState(true);

  const sidebarRef = useRef();

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#fff" : "",
    backgroundColor: isActive ? "0d6efd" : "",
  });

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
            <div className="sidebar__title">Dashboard</div>
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

    // <>
    //   <nav>
    //     <input type="checkbox" name="open" id="open" />
    //     <label for="open" class="open">
    //       <i class="fas fa-bars"></i>
    //     </label>
    //     <div className="sidebar">
    //       <div className="sidebar__logo"></div>
    //       <div ref={sidebarRef} className="sidebar__menu">
    //         {sidebarNavItems.map((item, index) => (
    //           <NavLink
    //             to={item.to}
    //             key={index}
    //             style={navLinkStyle}
    //             className="sidebar__menu__item"
    //             exact={index === 0 ? true : false}
    //           >
    //             <div className="sidebar__menu__item__icon">{item.icon}</div>
    //             <div className="sidebar__menu__item__text">{item.display}</div>
    //           </NavLink>
    //         ))}
    //       </div>
    //     </div>
    //   </nav>
    // </>
  );
};

export default Sidebar;
