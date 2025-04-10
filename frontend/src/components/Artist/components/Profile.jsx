import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AddTrack } from "./AddTrack";

const ArtistProfile = () => {

  const [showForm, setShowForm] = useState(false);
  const [artist,setArtist] = useState();
  const [totalTracks, setTotalTracks] = useState(0);
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


  const getTotalTracks = () => {
    try {
        axios.get(`http://localhost:5000/${artistDetails[0]?.artist_id}/totalTracks`,{
          headers:{
            "Content-Type":"application/json"
          }
        }).then((res) => {
          if(res.status === 200){
            setTotalTracks(res.data)
          } 
        })
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getArtistDetails();
    getTotalTracks();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full p-4">
      {artist?.map((artist) => (
        <div
          className="artist-header flex items-center justify-between bg-[#282870] p-4 rounded-lg shadow-md"
          key={artist.artist_id}
        >
          <div className="flex items-center gap-4">
            <img
              src={artist?.image || "http://localhost:5000/images/user.svg"}
              alt="Artist Image"
              className="artist-img w-28 h-28 bg-[#ffba53] rounded-md shadow-lg"
            />

            <div className="artist-info flex flex-col items-center  gap-2">
              <p className="text-[#ffba53] text-3xl font-bold m-0">
                {artist?.artist_name}
              </p>

              <button
                className="add-song bg-[#ffba53] shadow-md border-none px-5 py-2 text-black font-medium text-lg cursor-pointer transition hover:bg-[#f2c178]"
                onClick={() => setShowForm((prev) => !prev)}
              >
                Add Song
              </button>

              {showForm && (
                <AddTrack visible={showForm} setVisible={setShowForm} />
              )}
            </div>
          </div>


          <div className="song-count bg-[#ffba53] p-3 text-center font-semibold text-lg text-black shadow-lg rounded-md">
            {totalTracks?.map((totalTracks) => totalTracks?.total_tracks)?? 0} <br /> Songs
          </div>
        </div>
      ))}

      <style>
        {`
      ::-webkit-scrollbar {
        display: none;
      }
      ::placeholder {
        color: #666666;
        font-size: .8rem;
      }
    `}
      </style>
    </div>
  );
};
export default ArtistProfile;
