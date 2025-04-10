import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../editForm.css';  

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState(location.state || {});

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/users/${editedUser.user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUser),
    })
      .then((res) => res.json())
      .then(() => navigate("/admin/user"))
      .catch((err) => console.error("Error updating user:", err));
  };

  return (
    <div className="center-form">
      <div className="form-container">
        <h2 className="form-title">Edit User</h2>
        <form className="form-signup" onSubmit={handleSubmit}>
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            className="edit_input"
            value={editedUser.name || ""}
            onChange={handleChange}
            required
          />

          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            value={editedUser.email || ""}
            onChange={handleChange}
            required
          />

          <label className="form-label">Image URL</label>
          <input
            name="image"
            type="url"
            value={editedUser.image || ""}
            onChange={handleChange}
            required
          />

          <label className="form-label">Created At</label>
          <input
            name="created_at"
            type="date"
            value={editedUser.created_at ? editedUser.created_at.split("T")[0] : ""}
            onChange={handleChange}
            required
          />

          <div className="form-actions">
            <button type="submit" className="submit-btn">Save</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/user")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;