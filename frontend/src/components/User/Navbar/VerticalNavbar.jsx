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
    <div class="user_sidebar">
            <img src="/logo.svg" class="logo" alt="Noizee"/>
            <div class="nav_menu">
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
            <style>
              {
                `
                  .user_sidebar {
                    box-shadow: .15px 0px 0px 0px #f2c178;
                    width: 12em;
                    background: #0c0925;
                    height: 100vh;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                  }
                  
                  .logo {
                    width: 5em;
                    align-self: center;
                    margin-bottom: 20px;
                  }
                  
                  .menu {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                  }
                  
                  .menu-item {
                    display: flex;
                    align-items: center;
                    padding: 5px 25px;
                    border-radius: 3px;
                    cursor: pointer;
                    font-family: 'teko semibold';
                    font-size: .9rem;
                    color: #fff;
                    text-shadow: 1.5px 1px 0px #4949bf;
                  }
                  
                  .menu-item i {
                    font-size: 18px;
                    margin-right: 10px;
                    position: relative;
                    bottom: 1.9px;
                  }
                  
                  .menu-item:hover {
                    background: #333157;
                  }
                  
                  .menu-item.active {
                    background: #282870;
                    color: #ffba53;
                    text-shadow: .9px 1px 0px #935d07;
                  }
                  
                  .playlists {
                    margin-top: 10px;
                    border-top: 1px solid #443723f0;
                  }
                  
                  .playlists h4 {
                    font-size: 1rem;
                    color: #ffffff;
                    margin-bottom: 0px;
                    position: relative;
                    bottom: 10px;
                    font-weight: 600;
                    left: 30px;
                  }
                  
                  .playlist-item.active {
                    background: #f2c17832;
                    color: #f2c178;
                  }
                  
                  .playlist-item {
                    position: relative;
                    bottom: 6px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: -5px;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                  }
                  
                  .playlist-item:hover {
                    background: #3b3b3b;
                  }
                  
                  .playlist-item .icon {
                    width: 30px;
                    height: 30px;
                    background: #ffba53;
                    box-shadow: 2px 2px 0px 1px #935d07;
                    border-radius: 4px;
                    position: relative;
                    bottom: 2px;
                  }
                  
                  .playlist-item .text {
                    font-size: .1rem;
                  }
                  
                  .playlist-item .text p {
                    margin: 0;
                    font-size: .7rem;
                    font-weight: 400;
                  }
                    
                  .playlist-item .text span {
                    font-size: 10px;
                    position: relative;
                    bottom: 3px;
                    color: gray;
                  }
                `
              }
            </style>
        </div>
  );
};

export default VerticalNavbar;
