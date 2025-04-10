import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MusicTable = () => {
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const PAGE_SIZE = 500; // Number of songs per request

  // Fetch songs with pagination
  const fetchSongs = useCallback(async () => {
    if (!hasMore) return; // Stop fetching if no more songs

    try {
      const response = await fetch(`http://localhost:5000/api/songs?page=${page}&limit=${PAGE_SIZE}`);
      const data = await response.json();
      
      if (data.length < PAGE_SIZE) setHasMore(false); // If fetched less than PAGE_SIZE, no more data

      setSongs((prev) => [...prev, ...data]); // Append new songs
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  // Detect scrolling to bottom and load more songs
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle delete song
  const handleDelete = async (song_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/songs/${song_id}`, { method: "DELETE" });

      if (response.ok) {
        setSongs((prevSongs) => prevSongs.filter((song) => song.song_id !== song_id));
      } else {
        console.error("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  // Navigate to Edit Page
  const handleEdit = (song) => {
    navigate(`/admin/music/edit/${song.song_id}`, { state: song });
  };

  // Format song duration
  const songDuration = (position) => {
    let minute = Math.floor((position / 1000) / 60);
    let second = Math.floor((position / 1000) % 60);
    return `${minute}:${second < 10 ? '0' + second : second}`;
  };

  return (
    <div className="songs">
      <h3>Manage Songs</h3>
      <table>
        <thead>
          <tr>
            <th>Artist Image</th>
            <th>Song Name</th>
            <th>Artist</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.song_id}>
              <td>
                <img src={song.artist_image} alt="Artist" style={{ width: "50px", borderRadius: "5px" }} />
              </td>
              <td>{song.song_name}</td>
              <td>{song.artist_name}</td>
              <td>{songDuration(song.duration)}</td>
              <td className="action-buttons">
                <button className="delete-btn" onClick={() => handleDelete(song.song_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!hasMore && <p style={{ textAlign: "center", marginTop: "10px" }}>No more songs to load</p>}
    </div>
  );
};

export default MusicTable;
