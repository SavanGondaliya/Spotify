import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import MusicLoader from "../utility/Loader";
import "./style.css";

export const TopHollywood = () => {

  const session_details = sessionStorage.getItem("session_details");
  const [topHollywoodArtist, setTopHollywoodArtist] = useState();
  const {player,deviceId} = useWebPlayback();

  const topBollywoodArtists = async () => {
    const response = await axios.get(`http://localhost:5000/top-hollywood`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.status === 200) {
      setTopHollywoodArtist(response.data);
    }
  };

  useEffect(() => {
    topBollywoodArtists();
  }, [deviceId]);

  return (
    <div>
       <div className="text-2xl mx-5">
        Great English
      </div>
      <div className="flex flex-col justify-center overflow-scroll  items-center px-5 py-5">
        <div className="flex w-fit h-fit py-5">
          {topHollywoodArtist && topHollywoodArtist.length > 0 ? (
            topHollywoodArtist.map((artist) => (
              <NavLink to={`http://localhost:5173/artist/${artist.artist_id}`} key={artist.artist_id} className="w-full h-full flex flex-col justify-center items-center rounded_image hover_card">
                <div className="mx-5 py-5">
                  <div className="relative w-30 h-30">
                    <img
                      className="w-full h-full object-cover shadow-lg __artist_image__ rounded_image"
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
            <div>
              <MusicLoader/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
