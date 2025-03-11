import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MusicTable = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch Songs with Artist Image & Name
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  // Update state if an updated song was passed from EditMusic
  useEffect(() => {
    if (location.state?.updatedSong) {
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.song_id === location.state.updatedSong.song_id ? location.state.updatedSong : song
        )
      );
    }
  }, [location.state]);

  // Handle delete song
  const handleDelete = async (song_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/songs/${song_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSongs(songs.filter((song) => song.song_id !== song_id));
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

  
  const songDuration = (position) => {
      
    let minute = Math.floor((position/1000) / 60)
    let second = Math.floor((position/1000) % 60)
    
    return `${minute} : ${second < 10 ? '0'+second : second}`
    
  }


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
              <td>{song.title}</td>
              <td>{song.artist_name}</td>
              <td>{songDuration(song.duration)}</td>
              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(song)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(song.song_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MusicTable;
