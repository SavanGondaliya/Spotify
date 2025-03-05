import axios from "axios";
import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play,Pause } from "../utility/SongManipulation";

export const KPOP = () => {

  const session_details = sessionStorage.getItem("session_details");
  const [kpopAlbum, setKpopAlbum] = useState();
  const {player,deviceId} = useWebPlayback();
  const [isPlay,setIsPlay] = useState();

  const getKpopArtists = async () => {
    const response = await axios.get(`http://localhost:5000/kpop`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.status === 200) {
      setKpopAlbum(response.data);
    }
  };

  const handleMusic = (id,type) => {
      if(isPlay == id){
        Pause(id,deviceId,type)
        setIsPlay(null);
      }
      else{
        Play(id,deviceId,type)
        setIsPlay(id)
      }
  }

  useEffect(() => {
    getKpopArtists();
  }, [deviceId]);

  return (
    <div>
      <div className="flex flex-col justify-center  items-center bg-black px-5 py-5">
        <div className="flex w-fit h-fit bg-black py-5">
          {kpopAlbum && kpopAlbum.length > 0 ? (
            kpopAlbum.map((artist) => (
              <NavLink to={`http://localhost:5173/artist/${artist.artist_id}`} key={artist.artist_id} className="w-full h-full flex flex-col justify-center items-center rounded_image hover_card">
                <div className="mx-5 py-5 group">
                  <div className="relative w-full h-full ">
                    <img
                      className="w-20 h-20 object-cover shadow-lg album_shadow rounded_image"
                      src={artist.image}
                      alt=""
                    />
                  </div>
                  <div className="w-full h-full text-amber-100 my-2">
                    <h1 className="text-center">{artist.artist_name}</h1>
                    <h1 className="text-center">Artist</h1>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default KPOP;