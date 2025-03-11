import React from 'react';
import { Link } from 'react-router-dom'

const TopBar = ({ title }) => {
  return (
    <div className="top-bar">
      <h2>{title}</h2>
      <div className="auth">
        <Link href="#" className="auth-link">
          LOGOUT
        </Link>
        <div className="profile-icon"></div>
      </div>
    </div>
  );
};

export default TopBar;