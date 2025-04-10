import React, { useEffect } from "react";
import axios from "axios";
import { AboutSection } from "../../components/Artist/components/About";
import { TopTracks } from "../../components/Artist/components/TopTracks";
import { ArtistAlbumPage } from "../../components/Artist/components/ArtistAlbum";
import Sidebar from "../../components/Artist/components/Sidebar";
import ArtistProfile from "../../components/Artist/components/Profile";
import { useState } from "react";

const ArtistDashboardPage = () => {

  const [artist,setArtist] = useState();
  const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"))[0];
 
  const getArtistDetails = () => {
    try {
      const url = `http://localhost:5000/local/artist/${artistDetails?.artist_id}`;
      
      axios
        .get(url,{
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setArtist(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if(artistDetails){
      getArtistDetails();
    }
  },[]);

  return (
    <div className="flex h-full min-h-screen overflow-hidden">
      
      <div className="w-1/5 text-white">
        <Sidebar />
      </div>
      
      <div className="flex flex-col w-full p-6 space-y-6 overflow-y-auto min-h-0">
        <ArtistProfile  />
        <TopTracks />
        <ArtistAlbumPage />
        <AboutSection aboutArtist={artistDetails?.bio} />
      </div>
    </div>
  );
};

export default ArtistDashboardPage;
