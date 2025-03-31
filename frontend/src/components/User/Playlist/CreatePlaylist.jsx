import React, { useEffect, useState } from "react";
import { PlaylistBase64 } from "./icon/Playlist";
import axios from "axios";

export const CreatePlaylist = ({ addPlaylist }) => {
  const session_details = sessionStorage.getItem("session_details");
  const [playlistName, setPlaylistName] = useState("");
  const [playlistBio, setplaylistBio] = useState("");
  const [playlistStatus, setPlaylistStatus] = useState(false);

  const handlePlaylist = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/playlist/create?session_details=${session_details}`,
        {
          playlist_name: playlistName,
          bio: playlistBio,
          status: playlistStatus,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        await addPlaylist(); // Ensure the playlist list updates first
        setPlaylistName(""); // Clear input fields
        setplaylistBio("");
        setPlaylistStatus(false);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded bg-indigo-800 p-6 playlist">
      
      <div className="w-full flex flex-col md:flex-row rounded gap-6">
        <div className="w-full flex justify-center items-center">
          <img
            className="w-25 h-25 bg-indigo-900 object-cover shadow-lg rounded-md __create_playlist__ text-black"
            src={PlaylistBase64}
            alt="Playlist Cover"
          />
        </div>

      
        <div className="w-full  flex flex-col justify-center gap-4">
          <input
            type="text"
            name="Playlist_name"
            value={playlistName}
            placeholder="Playlist Name"
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-50 p-3 rounded text-black bg-white outline-0 __create_playlist__"
          />

          <textarea
            name="playlist_bio"
            value={playlistBio}
            placeholder="Playlist Bio"
            onChange={(e) => setplaylistBio(e.target.value)}
            className="w-50 p-3 rounded bg-white text-black border border-gray-300 resize-none __create_playlist__"
            rows="3"
          />
        </div>
      </div>

      
      <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <select
          value={playlistStatus}
          onChange={(e) => setPlaylistStatus(e.target.value)}
          className="p-3 rounded bg-white text-black border border-gray-300 __create_playlist__"
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>

        <button
          onClick={handlePlaylist}
          className="px-5 py-3 bg-indigo-600 text-black rounded hover:bg-indigo-700 transition __create_playlist__"
        >
          Create Playlist
        </button>
      </div>
      <style>
        {
          `
          .__create_playlist__{
            box-shadow : 5px 5px 0px ;
          }
          `
        }
      </style>
    </div>
  );
};
