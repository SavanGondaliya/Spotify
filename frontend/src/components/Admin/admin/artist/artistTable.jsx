import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtistsTable = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);  // State for handling errors
  const navigate = useNavigate();

  // Fetch Artists from API
  useEffect(() => {
    fetch("http://localhost:5000/api/artists")
      .then((response) => response.json())
      .then((data) => setArtists(data))
      .catch((error) => {
        console.error("Error fetching artists:", error);
        setError("Failed to fetch artists. Please try again later.");
      });
  }, []);

  // Delete Artist
  const handleDelete = (artist_id) => {
    // Make DELETE request to the backend
    fetch(`http://localhost:5000/api/artists/${artist_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If deletion is successful, filter out the artist from the state
          setArtists(artists.filter((artist) => artist.artist_id !== artist_id));
        } else {
          console.error("Error deleting artist");
          setError("Failed to delete artist. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error deleting artist:", error);
        setError("Failed to delete artist. Please try again.");
      });
  };

  // Navigate to Edit Page
  const handleEdit = (artist) => {
    navigate(`/admin/artist/edit/${artist.artist_id}`, { state: artist });
  };

  
  const songDuration = (position) => {
      
    let minute = Math.floor((position/1000) / 60)
    let second = Math.floor((position/1000) % 60)
    
    return `${minute} : ${second < 10 ? '0'+second : second}`
    
  }

  return (
    <div className="songs">
      <h3>Manage Artists</h3>

      {error && <div className="error-message">{error}</div>} {/* Show error message if any */}

      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Artist Name</th>
            <th>Songs</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.artist_id}>
              <td>
                <img
                  className="artist-profile"
                  src={artist.image} // Assuming profile is a URL from the database
                  alt="Profile"
                  style={{ width: "50px", borderRadius: "5px" }}
                />
              </td>
              <td>{artist.artist_name}</td>

              {/* Here you can dynamically display the list of songs of each artist */}
              {/* You might want to call another API to get songs of this artist */}
              <td>
                {/* Example: List songs by artist (Assume you fetch songs in another useEffect if needed) */}
                {artist.songs ? artist.songs.join(', ') : "No songs available"}
              </td>

              <td className="action-buttons">
                <button className="edit-btn" onClick={() => handleEdit(artist)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(artist.artist_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistsTable;
