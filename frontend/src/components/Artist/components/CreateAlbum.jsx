import { useState } from "react";
import axios from "axios";
export const CreateAlbum = ({visible,setVisible,refresh})  => {
  
    const [albumName,setAlbumName] = useState("");
    const [fileName,setFileName] = useState(null);
    const [totalTracks,setTotalTracks] = useState("");
    const artistDetails = JSON.parse(
      sessionStorage.getItem("artistDetails")
    )[0];


    const handleAlbum = async () => {
        try {
          
            const formData = new FormData();
            formData.append("album_name", albumName);
            formData.append("image", fileName); 
            formData.append("total_tracks", totalTracks);
            formData.append("artist_id", artistDetails?.artist_id);
    
            axios.post(`http://localhost:5000/album/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                
                if (res.status === 200) {
                  setVisible((prev) => !prev); 
                  refresh((prev) => !prev)
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
    <div className="fixed top-0 right-0 w-80 h-full bg-[#282870] p-6 shadow-lg z-50 flex flex-col gap-5 justify-center">
    <h2 className="text-white text-2xl font-semibold text-center">Add a New Song</h2>
  
    <div className="flex flex-col gap-3">
      <label htmlFor="songTitle" className="text-white font-medium">Album Name</label>
      <input
        id="songTitle"
        type="text"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        placeholder="Enter Album Name"
        className="p-2 bg-white rounded-md outline-none text-black"
      />
    </div>
  
    <div className="flex flex-col gap-3">
      <label htmlFor="songFile" className="text-white font-medium">Choose Album Image</label>
      <input
        type="file"
        onChange={(e) => setFileName(e.target.files[0])}
        className="p-2 bg-white rounded-md outline-none"
      />
    </div>
  
    <div className="flex flex-col gap-3">
      <label htmlFor="trackNumber" className="text-white font-medium">Total Tracks</label>
      <input
        type="number"
        value={totalTracks}
        onChange={(e) => setTotalTracks(e.target.value)}
        placeholder="Enter Total Tracks"
        className="p-2 bg-white rounded-md outline-none text-black"
      />
    </div>
  
    <div className="flex gap-3 mt-5">
      <button
        onClick={() => { handleAlbum()}}
        className="w-1/2 bg-[#ffba53] hover:bg-[#f2c178] text-black font-semibold py-2 rounded-md shadow-md"
      >
        Create Album
      </button>
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="w-1/2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded-md shadow-md"
      >
        Cancel
      </button>
    </div>
  </div>
  
  );
}
export default CreateAlbum;