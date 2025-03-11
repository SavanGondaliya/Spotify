import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Logo from "/public/logo.svg";

const menuItems = [
  { name: 'DASHBOARD', icon: 'ri-dashboard-line', link: '/admin' },
  { name: 'ARTISTS', icon: 'ri-user-6-line', link: '/admin/artist' },
  { name: 'MUSIC', icon: 'ri-music-line', link: '/admin/music' },
  { name: 'USERS', icon: 'ri-user-line', link: '/admin/user' },
];

const Sidebar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(menuItems.findIndex(item => item.link === location.pathname));

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="sidebar">
      <img
        src={Logo}
        alt="Noizee"
        className="logo"
        style={{ width: '5em', marginBottom: '20px' }}
      />
      <div className="menu">
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index} onClick={() => handleClick(index)}>
            <div className={`menu-item ${activeIndex === index ? 'active' : ''}`}>
              <i className={item.icon}></i>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;