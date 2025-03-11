import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditArtist = () => {
  const { id } = useParams(); // Get artist ID from URL params
  const navigate = useNavigate();
  const [editedArtist, setEditedArtist] = useState({
    artist_name: "",
    image: "",
  });

  // Fetch the artist data when the component mounts
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/artists/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setEditedArtist({
            artist_name: data.artist_name || "",
            image: data.image || "",
          });
        })
        .catch((error) => console.error("Error fetching artist details:", error));
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setEditedArtist({ ...editedArtist, [e.target.name]: e.target.value });
  };

  // Handle form submit (API Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/artists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artist_name: editedArtist.artist_name,
          image: editedArtist.image, // Allowing image URL to be updated
        }),
      });

      if (response.ok) {
        // If update is successful, navigate back to the artist list or any other desired route
        navigate("/admin/artist");
      } else {
        console.error("Failed to update artist");
      }
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  return (
    <form className="form-signup" onSubmit={handleSubmit}>
      <p className="login-title">Edit Artist</p>

      {/* Artist Name */}
      <label className="login-detail">Artist Name</label>
      <input
        name="artist_name"
        type="text"
        value={editedArtist.artist_name || ""}
        onChange={handleChange}
        required
      />

      {/* Artist Image URL */}
      <label className="login-detail">Profile Image URL</label>
      <input
        name="image"
        type="text"
        value={editedArtist.image || ""}
        onChange={handleChange}
        required
      />

      <div className="form-actions">
        <button type="submit" className="save-btn">Save</button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/admin/artist")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditArtist;