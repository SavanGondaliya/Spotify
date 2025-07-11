import React from 'react';
import Sidebar from './sidebar';
import TopBar from './adminNav';
import Cards from './cards';
import Songs from './recentsongs';
import "./admin.css";

const AdminDashboard = () => {

  if(!sessionStorage.getItem("admin_details")){
    window.location.href = "/auth/admin"
  }

  return (
    <div className="main-page">
      <Sidebar />
      <div className="main">
        <TopBar title="Admin" />
        <Cards />
        <Songs />
      </div>
    </div>
  );
};

export default AdminDashboard;