import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "DASHBOARD", icon: "ri-dashboard-line", link: "/admin" },
  { name: "ARTISTS", icon: "ri-user-6-line", link: "/admin/artist" },
  { name: "MUSIC", icon: "ri-music-line", link: "/admin/music" },
  { name: "USERS", icon: "ri-user-line", link: "/admin/user" },
];

const Sidebar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(
    menuItems.findIndex((item) => item.link === location.pathname)
  );

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="sidebar flex flex-col items-center py-6">
      <img src="/logo.svg" alt="Noizee" className="logo w-20 mb-6" />

      <div className=" flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index} onClick={() => handleClick(index)}>
            <div
              className={`menu-item flex items-center gap-3 px-6 py-3 rounded-md transition ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
