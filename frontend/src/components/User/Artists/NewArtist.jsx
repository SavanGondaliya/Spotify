import axios from "axios";
import React,{ useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import  {useWebPlayback}  from "../utility/WebPlayBackSDK";
import "./style.css";
import MusicLoader from "../utility/Loader";

export const NewArtist = () => {

  const session_details = sessionStorage.getItem("secret_key");
  const [newArtist, setNewArtist] = useState();
  const {player, deviceId} = useWebPlayback();

  const getNewArtist = async () => {
    const response = await axios.get(`http://localhost:5000/newArtist`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setNewArtist(response.data);
    }
  };

  useEffect(() => {
    getNewArtist();
  }, [player,deviceId]);
  
  return (
    <div className="w-full">
      <div className="text-2xl mx-5">New Artist</div>

      <div className="overflow-x-auto py-5">
        <div className="grid grid-flow-col auto-cols-max gap-1 px-5">
          {newArtist && newArtist.length > 0 ? (
            newArtist.map((artist) => (
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
