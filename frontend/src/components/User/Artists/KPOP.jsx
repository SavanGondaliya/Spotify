import axios from "axios";
import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play,Pause } from "../utility/SongManipulation";
import MusicLoader from "../utility/Loader";

export const KPOP = () => {

  const session_details = sessionStorage.getItem("secret_key");
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
       <div className="text-4xl mx-5 ">
        Korean POP
      </div>
      <div className="flex flex-col justify-center items-center px-5 py-5 overflow-scroll">
        <div className="flex w-full h-full py-5">
          {kpopAlbum && kpopAlbum.length > 0 ? (
            kpopAlbum.map((artist) => (
              <NavLink to={`http://localhost:5173/artist/${artist.artist_id}`} key={artist.artist_id} className="w-full h-full flex flex-col justify-center items-center rounded_image hover_card">
                <div className="mx-5 py-5 group">
                  <div className="relative w-30 h-30">
                    <img
                      className="w-full h-full object-cover shadow-lg __artist_image__ rounded_image"
                      src={artist.image}
                      
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
            <div>
              <MusicLoader/>
            </div>
          )}
        </div>
      </div>
      
      <style>
        {
          `
            .__artist_image__{
              box-shadow: 8px 8px 0px #4949bf;
            }
          `
        }
      </style>
    </div>
  );
};
export default KPOP;