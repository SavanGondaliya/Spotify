import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../editForm.css';  // Import the updated CSS file

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
        navigate("/admin/artist");
      } else {
        console.error("Failed to update artist");
      }
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  return (
    <div className="center-form">
      <div className="form-container">
        <h2 className="form-title">Edit Artist</h2>
        <form className="form-signup" onSubmit={handleSubmit}>
          <label className="login-detail">Artist Name</label>
          <input
            name="artist_name"
            type="text"
            value={editedArtist.artist_name || ""}
            onChange={handleChange}
            required
          />

          <label className="login-detail">Profile Image URL</label>
          <input
            name="image"
            type="url"
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
      </div>
    </div>
  );
};

export default EditArtist;
