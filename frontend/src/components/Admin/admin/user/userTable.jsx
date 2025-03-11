import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch users from API
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // ✅ Delete user from API
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setUsers(users.filter((user) => user.user_id !== id)))
      .catch((err) => console.error("Error deleting user:", err));
  };

  // ✅ Navigate to Edit Page
  const handleEdit = (user) => {
    navigate(`/admin/user/edit/${user.user_id}`, { state: user });
  };

  return (
    <div>
      <h3>Manage Users</h3>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>User's Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>
                <img src={user.image} alt="user" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;