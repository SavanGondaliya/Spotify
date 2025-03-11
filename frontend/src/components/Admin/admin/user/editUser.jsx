import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState(location.state || {});

  // ✅ Handle input changes
  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (Update user)
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
    <div className="edit-container">
      <form className="form-signup" onSubmit={handleSubmit}>
        <p className="login-title">Edit User</p>
        
        <label className="login-detail">Name</label>
        <input name="name" type="text" value={editedUser.name || ""} onChange={handleChange} required />

        <label className="login-detail">Email</label>
        <input name="email" type="email" value={editedUser.email || ""} onChange={handleChange} required />

        <label className="login-detail">Image URL</label>
        <input name="image" type="text" value={editedUser.image || ""} onChange={handleChange} required />

        <label className="login-detail">Created At</label>
        <input name="created_at" type="date" value={editedUser.created_at ? editedUser.created_at.split('T')[0] : ""} onChange={handleChange} required />

        <div className="form-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate("/admin/user")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;