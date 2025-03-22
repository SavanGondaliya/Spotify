import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import {CreatePlaylist} from "../Playlist/CreatePlaylist.jsx";
import { getUserPlaylist } from "../utility/SongManipulation.jsx";


const VerticalNavbar = () => {

  const [activePlaylist, setActivePlaylist] = useState(null);
  const session_details = JSON.parse(sessionStorage.getItem("session_details"));
  const [userPlaylists,setPlaylists] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const playlists = async() => {
    let playlist = await getUserPlaylist();
    setPlaylists(playlist);
  } 


  const addPlaylist = () => {
    playlists();
    setShowForm(false); 
  };

  useEffect(() => {
    playlists()
  },[]);

  return ( 
    <div>
    {/* Sidebar */}
    <div className="user_sidebar">
      <img src="/logo.svg" className="logo" alt="Noizee" />

      {/* Navigation Menu */}
      <div className="nav_menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
          <i className="ri-home-4-line"></i>
          <span>HOME</span>
        </NavLink>
        <NavLink to="/music" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
          <i className="ri-music-line"></i>
          <span>MUSIC</span>
        </NavLink>
        <NavLink to={`/${session_details?.user_id}/playlists`} className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
          <i className="ri-play-list-line"></i>
          <span>PLAYLIST</span>
        </NavLink>
        <NavLink to="/favourite" className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
          <i className="ri-heart-line"></i>
          <span>FAVORITE</span>
        </NavLink>
      </div>

      {/* Playlists Section */}
      <div className="playlists">
        <div className="playlist-header flex justify-between items-center">
          <p className="text-2xl">My Playlists</p>
          <i className="create_playlist ri-add-line cursor-pointer text-2xl" onClick={() => setShowForm(true)}></i>
        </div>

        {/* User Playlists */}
        {userPlaylists?.map((playlist, index) => (
          <NavLink
            to={`/playlist/${playlist.playlist_id}`}
            key={playlist.id}
            className={`playlist-item ${activePlaylist === index ? "active" : ""}`}
            onClick={() => setActivePlaylist(index)}
          >
            <div className="icon"></div>
            <div className="text">
              <p>{playlist.playlist_name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>

    {/* Create Playlist Modal */}
    {showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-indigo-800 p-6 rounded-lg w-[400px] relative">
          {/* Close Button */}
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-2 right-2 text-white text-lg"
          >
            ✖
          </button>

          {/* Create Playlist Component */}
          <CreatePlaylist addPlaylist={() => setShowForm(false)} />
        </div>
      </div>
    )}
  
        {/* CSS Styling */}
        <style>
          {`
            .user_sidebar {
              width: 14em;
              background: #0c0925;
              height: 100vh;
              padding: 20px;
              display: flex;
              flex-direction: column;
              box-shadow: 0 0 5px rgba(255, 186, 83, 0.5);
            }
            
            .logo {
              width: 6em;
              align-self: center;
              margin-bottom: 20px;
            }
            
            .nav_menu {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
    
            .menu-item {
              display: flex;
              align-items: center;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-family: 'Teko', sans-serif;
              font-size: 1rem;
              color: #fff;
              transition: background 0.3s ease-in-out;
            }
    
            .menu-item i {
              font-size: 20px;
              margin-right: 12px;
            }
    
            .menu-item:hover {
              background: #333157;
            }
    
            .menu-item.active {
              background: #282870;
              color: #ffba53;
            }
    
            .playlists {
              margin-top: 20px;
              border-top: 1px solid rgba(255, 186, 83, 0.3);
              padding-top: 10px;
            }
    
            .playlist-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 5px 15px;
              color: white;
            }
    
            .create_playlist {
              cursor: pointer;
              font-size: 18px;
            }
    
            .playlist-item {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 10px 15px;
              border-radius: 5px;
              cursor: pointer;
              transition: background 0.3s ease-in-out;
            }
    
            .playlist-item:hover {
              background: #3b3b3b;
            }
    
            .playlist-item.active {
              background: rgba(242, 193, 120, 0.2);
              color: #f2c178;
            }
    
            .playlist-item .icon {
              width: 35px;
              height: 35px;
              background: #ffba53;
              box-shadow: 2px 2px 5px rgba(147, 93, 7, 0.5);
              border-radius: 5px;
            }
    
            .playlist-item .text p {
              margin: 0;
              font-size: 0.85rem;
              font-weight: 500;
            }
          `}
        </style>
      </div>
    );
    
};

export default VerticalNavbar;
