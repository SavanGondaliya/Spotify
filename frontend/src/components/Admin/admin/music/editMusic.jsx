import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditMusic = () => {
  const { id } = useParams(); // Get song ID from URL params
  const navigate = useNavigate();
  const [song, setSong] = useState({
    song_name: "",
    artist_name: "",
    duration: "",
    artist_id: "",
  });
  
  const [artists, setArtists] = useState([]);

  // Fetch song details
  useEffect(() => {
    fetch(`http://localhost:5000/api/songs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSong({
          song_name: data.title,
          artist_name: data.artist_name, // If you want to store artist_name
          duration: data.duration,
          artist_id: data.artist_id
        });
      })
      .catch((error) => console.error("Error fetching song details:", error));
  }, [id]);

  // Fetch artist list for dropdown
  useEffect(() => {
    fetch("http://localhost:5000/api/artists")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        console.log(data)
      })
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  // Handle form submission (API Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/songs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: song.song_name,
        artist_id: song.artist_id,
        duration: song.duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Song updated successfully:", data);
        navigate("/admin/music"); // Redirect after update
      })
      .catch((error) => console.error("Error updating song:", error));
  };

  return (
    <form className="form-signup" onSubmit={handleSubmit}>
      <p className="login-title">Edit Music</p>

      {/* Song Name */}
      <label className="login-detail">Song Name</label>
      <input
        name="song_name"
        type="text"
        value={song.song_name}
        onChange={handleChange}
        required
      />

      {/* Artist Selection */}
      <label className="login-detail">Artist</label>
      <select name="artist_id" value={song.artist_id} onChange={handleChange} required>
        <option value="">Select Artist</option>
        {artists.map((artist) => (
          <option key={artist.artist_id} value={artist.artist_id}>
            {artist.artist_name}
          </option>
        ))}
      </select>

      {/* Duration */}
      <label className="login-detail">Duration (in minutes)</label>
      <input
        name="duration"
        type="text"
        value={song.duration}
        onChange={handleChange}
        required
      />

      {/* Form Buttons */}
      <div className="form-actions">
        <button type="submit" className="save-btn">Save</button>
        <button type="button" className="cancel-btn" onClick={() => navigate("/admin/music")}>Cancel</button>
      </div>
    </form>
  );
};

export default EditMusic;