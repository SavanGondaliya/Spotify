import React from 'react';
import Sidebar from '../sidebar';
import TopBar from '../adminNav';
import SearchBar from './searchBar';
import ArtistsTable from './artistTable';
import "./artist.css";

const ArtistsDashboard = () => {
  return (
    <div className="main-page">
      <Sidebar />
      <div className="main">
        <TopBar title="Artists" />
        <SearchBar placeholder="Search your favorites" />
        <ArtistsTable />
      </div>
    </div>
  );
};

export default ArtistsDashboard;
