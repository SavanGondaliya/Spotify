import React from 'react';
import Sidebar from '../sidebar';
import TopBar from '../adminNav';
import SearchBar from './searchBar';
import MusicTable from './musicTable';
import "./music.css";

const MusicDashboard = () => {
  return (
    <div className="main-page">
      <Sidebar />
      <div className="main">
        <TopBar title="Music" />
        <SearchBar placeholder="Search your favorites" />
        <MusicTable />
      </div>
    </div>
  );
};

export default MusicDashboard;
