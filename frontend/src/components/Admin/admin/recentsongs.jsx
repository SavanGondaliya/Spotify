import React, { useState, useEffect } from "react";
import "./admin.css";

const Songs = () => {
  const [songs, setSongs] = useState([]);

  // ✅ Fetch songs from API (Limit: 20)
  useEffect(() => {
    fetch("http://localhost:5000/api/songs?limit=20")
      .then((res) => res.json())
      .then((data) => {
        // Remove duplicate songs based on song_id
        const uniqueSongs = data.filter((song, index, self) =>
          index === self.findIndex((s) => s.song_id === song.song_id)
        );
        setSongs(uniqueSongs);
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  return (
    <div className="songs">
      <h3>Most Streamed Songs</h3>
      {console.log(songs)}
      {songs.map((song) => (
        <SongItem key={song.song_id} song={song} />
      ))}
      <div className="show-all">Show all</div>
    </div>
  );
};


const songDuration = (position) => {
      
  let minute = Math.floor((position/1000) / 60)
  let second = Math.floor((position/1000) % 60)
  
  return `${minute} : ${second < 10 ? '0'+second : second}`
 
}

const SongItem = ({ song }) => {
  return (
    <div className="song">
      <img src={song.artist_image} alt="album" />
      <div className="info">
        <div>
          {song.title} <p className="artist">{song.artist_name}</p>
        </div>
        <div>
          <p className="album-name">{song.song_name}</p>
        </div>
        <div>
          <p>{songDuration(song.duration)}</p>
        </div>
      </div>
    </div>
  );
};

export default Songs;