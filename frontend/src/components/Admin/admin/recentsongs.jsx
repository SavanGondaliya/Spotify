import React, { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const session_details = sessionStorage.getItem("secret_key");

  useEffect(() => {
    
    axios.get(`http://localhost:5000/music?session_details=${session_details}`)
      .then((res) => {
        if(res.status === 200){
          setSongs(res.data)
        }
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);
  console.log(songs);
  
  return (
    <div className="songs">
      <h3>Most Streamed Songs</h3>
      {songs?.tracks?.map((song) => (
        <SongItem key={song?.song_id} song={song} />
      ))}
      <div className="show-all">Show all</div>
    </div>
  );
};  

const SongItem = ({ song }) => {

  
  const songDuration = (position) => {
    let minute = Math.floor((position / 1000) / 60);
    let second = Math.floor((position / 1000) % 60);
    return `${minute}:${second < 10 ? '0' + second : second}`;
  };
  console.log(song);
  

  return (<div className="song">
    <div className="song-image">
      <img src={song?.album?.images[0]?.url} alt="album" />
    </div>
    <div className="song-title">
      <p>{song?.name}</p>
    </div>
    <div className="song-artist">
      <p>{song?.artists?.map((artist) => artist.name).join(", ")}</p>
    </div>
    <div className="song-album">
      <p>{song?.album?.name}</p>
    </div>
    <div className="song-duration">
      <p>{songDuration(song?.duration_ms)}</p>
    </div>
  </div>
  
  );
};

export default Songs;