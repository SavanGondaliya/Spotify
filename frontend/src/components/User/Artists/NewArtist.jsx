import axios from "axios";
import React,{ useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import  {useWebPlayback}  from "../utility/WebPlayBackSDK";
import "./style.css";

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
    <div>
      <div className="flex flex-col justify-center  items-center  px-5 py-5">
        <div className="flex w-fit h-fit py-5">
          {newArtist && newArtist.length > 0 ? (
            newArtist.map((artist) => (
              <NavLink to={`http://localhost:5173/artist/${artist.artist_id}`} key={artist.artist_id} className="w-full h-full flex flex-col justify-center items-center rounded_image hover_card">
                <div className="mx-5 py-5">
                  <div className="w-full h-full">
                    <img
                      className="w-20 h-20  object-cover shadow-lg album_shadow rounded_image"
                      src={`${artist?.image}`}
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
