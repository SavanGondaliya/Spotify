import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import {CreatePlaylist} from "../Playlist/CreatePlaylist.jsx";
import { UserPlaylist } from "../Playlist/UserPlaylist.jsx";
import { getUserPlaylist } from "../utility/SongManipulation.jsx";

const VerticalNavbar = () => {

  const session_details = JSON.parse(sessionStorage.getItem("session_details"));
  const [userPlaylists,setPlaylists] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const playlists = async() => {
    let playlist = await getUserPlaylist();
    setPlaylists(playlist);
  } 

  document.addEventListener("click",(e) => {
    if(!e.target.classList.contains("create_playlist")){
      setShowForm(false)
    }
  })

  const addPlaylist = () => {
    playlists();
    setShowForm(false); 
  };

  useEffect(() => {
    playlists()
  },[]);

  return (
    <div class="sidebar">
            <img src="/logo.svg" class="logo" alt="Noizee"/>
            <div class="menu">
                <NavLink to={`/`}>
                  <div class="menu-item active">
                      <i class="ri-home-4-line"></i>
                      <span>HOME</span>
                  </div>
                </NavLink>
                <NavLink to={`http://localhost:5173/music`}>
                  <div class="menu-item">
                      <i class="ri-music-line"></i>
                      <span>MUSIC</span>
                  </div>
                </NavLink>
                <NavLink to={`http://localhost:5173/${session_details?.user_id}/playlists`}>
                  <div class="menu-item">
                      <i class="ri-play-list-line"></i>
                      <span>PLAYLIST</span>
                  </div>
                </NavLink>
                <NavLink to={`/favourite`}>
                  <div class="menu-item">
                      <i class="ri-heart-line"></i>
                      <span>FAVORITE</span>
                  </div>
                </NavLink>
            </div>
            <div className="playlists">
              <div className="flex ">
              <h4>My Playlists</h4>
              <i className="create_playlist ri-add-line text-white" onClick={() => setShowForm(true)}></i> 
              {showForm && <CreatePlaylist addPlaylist={addPlaylist} />}
              </div> 
              <UserPlaylist playlists={userPlaylists} />
            </div>        
        </div>
  );
};

export default VerticalNavbar;
