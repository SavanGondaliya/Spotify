import axios from "axios";
import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import MusicLoader from "../utility/Loader";

export const TopBollywood = () => {
  const [topBollywoodArtist, setTopBollywoodArtist] = useState();
  const { player, deviceId } = useWebPlayback();

  const topBollywoodArtists = async () => {
    const response = await axios.get(`http://localhost:5000/top-bollywood`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setTopBollywoodArtist(response.data);
    }
  };

  useEffect(() => {
    topBollywoodArtists();
  }, [player, deviceId]);

  return (
    <div className="w-full">
      <div className="text-2xl mx-5">Classic Bollywood</div>

      <div className="overflow-x-auto py-5">
        <div className="grid grid-flow-col auto-cols-max gap-1 px-5">
          {topBollywoodArtist && topBollywoodArtist.length > 0 ? (
            topBollywoodArtist.map((artist) => (
              <NavLink
                to={`/artist/${artist.artist_id}`}
                key={artist.artist_id}
                className="flex flex-col items-center hover_card"
              >
                <div className="gap-5 p-5 flex flex-col items-center">
                  <div className="relative w-[120px] h-[120px]">
                    <img
                      className="w-full h-full object-cover shadow-lg __artist_image__ rounded-full"
                      src={artist.image}
                      alt=""
                    />
                  </div>
                  <div className="text-amber-100 text-center">
                    <h1>{artist.artist_name}</h1>
                    <h1>Artist</h1>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <div>
              <MusicLoader />
            </div>
          )}
        </div>
      </div>

      <style>
        {`
      .__artist_image__ {
        box-shadow: 5px 5px 0px #4949bf;
      }
    `}
      </style>
    </div>
  );
};
