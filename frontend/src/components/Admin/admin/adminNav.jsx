import React from 'react';
import { Link } from 'react-router-dom'
import './admin.css';

const TopBar = ({ title }) => {

  const logout = () => {
    sessionStorage.removeItem("admin_details")
    window.location.href = "/auth/admin"
  }

  return (
    <div className="top-bar">
      <h2>{title}</h2>
      <div onClick={logout}  className="auth">
        <Link className="auth-link">
          LOGOUT
        </Link>
        <div className="profile-icon"></div>
      </div>
    </div>
  );
};

export default TopBar;