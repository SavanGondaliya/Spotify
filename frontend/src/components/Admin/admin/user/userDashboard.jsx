import React from 'react';
import Sidebar from '../sidebar';
import TopBar from '../adminNav';
import SearchBar from './searchBar';
import UsersTable from './userTable';
// import "./user.css";

const UsersDashboard = () => {
  return (
    <div className="main-page">
      <Sidebar />
      <div className="main">
        <TopBar title="Users" />
        <SearchBar placeholder="Search your favorites" />
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersDashboard;