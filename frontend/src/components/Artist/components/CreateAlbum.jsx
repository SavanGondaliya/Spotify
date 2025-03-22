import { useState } from "react";
import axios from "axios";
export const CreateAlbum = ()  => {
  
    const [albumName,setAlbumName] = useState("");
    const [fileName,setFileName] = useState(null);
    const [totalTracks,setTotalTracks] = useState("");

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            formData.append("album_name", albumName);
            formData.append("image", fileName); 
            formData.append("total_tracks", totalTracks);
    
            console.log([...formData]); 
    
            axios.post(`http://localhost:5000/album/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    
        } catch (error) {
            console.log(error);
        }
    };




  return (
    <div className="form-container">
      <h2 className="form-title">Create Album</h2>
      <div>
        <label htmlFor="albumName">Album Name</label>
        <input
          id="albumName"
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          placeholder="Enter Album Name"
        />
      </div>
      <div className="file-input-container">
        <label htmlFor="albumFile">Choose File</label>
        <input
          id="albumFile"
          type="file"
          onChange={(e) => setFileName(e.target.files[0])}
        />
      </div>
      <div>
        <label htmlFor="totalTracks">Total Tracks</label>
        <input
          id="totalTracks"
          type="number"
          value={totalTracks}
          onChange={(e) => setTotalTracks(e.target.value)}
          placeholder="Enter Track Number"
        />
      </div>
      <button onClick={handleCreate} className="submit-btn">
        Create Album
      </button>
      <button className="cancel-btn">Cancel</button>

      <style>
        {`
          .form-container {
            position: fixed;
            top: 0;
            right: 0;
            width: 300px;
            height: 100%;
            background: #282870;
            padding: 10px 20px;
            box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.5);
            z-index: 1000;
          }

          .form-title {
            background-color: #4949bf;
            color: white;
            display: inline-block;
            padding: 5px 15px;
            font-size: 18px;
            width: 50%;
            position: relative;
            left: 65px;
            text-align: center;
            font-weight: 500;
          }

          label {
            display: block;
            margin-top: 10px;
            color: white;
          }

          input {
            width: 95%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #fdfdfd;
            outline: none;
          }

          .file-input-container {
            display: flex;
            align-items: center;
            background: #ffffff;
            padding: 5px;
            border: 2px solid black;
            cursor: pointer;
            font-weight: 500;
            margin-top: 10px;
          }

          button {
            width: 100%;
            padding: 8px;
            font-weight: 500;
            font-size: 1rem;
            margin-top: 10px;
            background-color: #ffba53;
            box-shadow: 2px 2px 0px 1px #935d07;
            border: none;
            cursor: pointer;
          }

          button:hover {
            background-color: #f2c178;
          }

          .cancel-btn {
            background: #4949bf;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
export default CreateAlbum;