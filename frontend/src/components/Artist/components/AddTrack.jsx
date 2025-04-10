import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const AddTrack = ({ visible, setVisible }) => {
  const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));
  const [trackName, setTrackName] = useState("");
  const [trackUrl, setTrackUrl] = useState();
  const [albumName, setAlbumName] = useState("");
  const [album, setAlbum] = useState([]);
  const [trackNumber, setTrackNumber] = useState([]);

  const handleTrack = () => {
    try {
      const formData = new FormData();

      formData.append("track_name", trackName);
      formData.append("track_url", trackUrl);
      formData.append("album_id", albumName);
      formData.append("track_number", trackNumber);
      
      axios
        .post(
          `http://localhost:5000/track/add?artist_id=${artistDetails[0]?.artist_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setVisible((prev) => !prev);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return error;
    }
  };

  const artistAlbums = () => {
    try {
      axios
        .get(
          `http://localhost:5000/local/${artistDetails[0]?.artist_id}/albums`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setAlbum(res.data);
          }
        });
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    artistAlbums();
  }, []);
  if (visible == true) {
    document.body.classList.add("fade-background"); 
  } else {
    document.body.classList.remove("fade-background");
  }

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-[#282870] p-5 shadow-lg z-50 flex flex-col gap-4">

      <h2 className="text-white text-2xl font-semibold mb-4 text-center">
        Add a New Song
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="songTitle" className="text-white font-medium">
          Song Name
        </label>
        <input
          id="songTitle"
          type="text "
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
          placeholder="Enter Track Name"
          className="p-2 text-black rounded-md outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white font-medium">Select Album</label>
        <select
          onChange={(e) => setAlbumName(e.target.value)}
          className="p-2 bg-white text-black rounded-md outline-none"
        >
          {album && album.length > 0 ? (
            album.map((album) => (
              <option key={album.album_id} value={album.album_id}>
                {album.album_name}
              </option>
            ))
          ) : (
            <option value="">Choose The Album</option>
          )}
        </select>
      </div>

      
      <div className="flex flex-col gap-2">
        <label htmlFor="songFile" className="text-white font-medium">
          Choose File
        </label>
        <input
          type="file"
          onChange={(e) => setTrackUrl(e.target.files[0])}
          className="p-2 bg-white text-black rounded-md outline-none"
        />
      </div>

      
      <div className="flex flex-col gap-2">
        <label htmlFor="trackNumber" className="text-white font-medium">
          Track Number
        </label>
        <input
          type="number"
          value={trackNumber}
          onChange={(e) => setTrackNumber(e.target.value)}
          placeholder="Enter Track Number"
          className="p-2 bg-white text-black rounded-md outline-none"
        />
      </div>

      
      <div className="flex justify-between flex-col gap-2 mt-4">
        <button
          onClick={() => (handleTrack())}
          className="w-full bg-[#f2c178]  text-black font-semibold py-2  shadow-md"
        >
          Add Song
        </button>
        <button
          onClick={() => setVisible((prev) => !prev)}
          className="w-full bg-[#f2c178]  text-black font-semibold py-2  shadow-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */