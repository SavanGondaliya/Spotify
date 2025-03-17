import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// import { AddTrack } from "./Tracks/AddTrack";
// import { ArtistTracks } from "./Tracks/ArtistTracks";
import { Sidebar } from "./NavBar/Sidebar";
import { ArtistProfile } from "./Auth/Profile";
import { ArtistAlbums } from "./Album/Albums";
import { ArtistAlbumPage } from "./ArtistAlbum";
import { AboutSection } from "./Album/About";

const ArtistDashboard = () => {


  const artistDetails = JSON.parse(sessionStorage.getItem('artistDetails'))
  const [artist,setArtist] = useState()
  const [formVisible,setFormVisible] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("artistDetails")
    window.location.href = "http://localhost:5173/artist/register"
  }

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(menu => {
            menu.classList.remove('active');
        });
        item.classList.add('active');
    });
  });

  document.querySelectorAll('.playlist-item').forEach(item => {
      item.addEventListener('click', () => {
          document.querySelectorAll('.playlist-item').forEach(menu => {
              menu.classList.remove('active');
          });
          item.classList.add('active');
      });
  });


  return (
    <div className="flex h-screen w-screen">
      <div className="w-[15%] h-full">
        <Sidebar />
      </div>
      <div className="w-[85%] h-full">
        <ArtistProfile />
        <ArtistAlbums/>
        <ArtistAlbumPage/>
        <AboutSection/>
      </div>
    </div>
  
  );
};

export default ArtistDashboard;
