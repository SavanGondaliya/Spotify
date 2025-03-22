import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// import { AddTrack } from "./Tracks/AddTrack";
// import { ArtistTracks } from "./Tracks/ArtistTracks";
import { Sidebar } from "./Sidebar";
import { ArtistProfile } from "./Profile";
import { ArtistAlbumPage } from "./ArtistAlbum";
import { AboutSection } from "./About";
import { TopTracks } from "./TopTracks";

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

  return(

  
  <div className="flex h-screen w-screen  text-white">

      <aside className="w-60 h-full  p-4">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">

        <section className="w-full">
          <ArtistProfile />
        </section>

        <div>
          <TopTracks />
        </div>
        <div>
          <ArtistAlbumPage />
        </div>

        <section className="w-full">
          <AboutSection />
        </section>
      </main>
    </div>
  )
};

export default ArtistDashboard;
