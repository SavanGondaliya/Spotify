import React,{useEffect,useState} from "react";
import { PlaylistBase64 } from "./icon/Playlist";
import axios from "axios";

export const CreatePlaylist = ({addPlaylist}) => {   

    const session_details = sessionStorage.getItem("session_details");
    const [playlistName,setPlaylistName] = useState("");
    const [playlistBio,setplaylistBio] = useState("");
    const [playlistStatus,setPlaylistStatus] = useState(false);

    const handlePlaylist = async() => {
        try {   
            const response = await axios.post(`http://localhost:5000/playlist/create?session_details=${session_details}`,
                {
                    "playlist_name":playlistName,
                    "bio":playlistBio,
                    "status":playlistStatus
                },{
                    headers:{
                        "Content-Type":"application/json"
                    }
            });
            if(response.status === 200){
                addPlaylist()
            }
        } catch (error) {
            return error;
        }
    }

    return(
        <div className="w-full h-full flex flex-col rounded bg-indigo-800 p-5 playlist">
  
        <div className="w-full flex rounded gap-6">
          
          <div className="w-[30%] flex justify-center items-center">
            <img className="w-full h-50 shadow-lg rounded-md" src={PlaylistBase64} alt="Playlist Cover" />
          </div>
      
          <div className="w-[70%] flex flex-col justify-center gap-4">
            
            <input 
              type="text"
              name="Playlist_name"
              value={playlistName}
              placeholder="Playlist Name"
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
            />
      
            <input 
              type="text"
              name="playlist_bio"
              value={playlistBio}
              placeholder="Playlist Bio"
              onChange={(e) => setplaylistBio(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
            />
      
          </div>
        </div>
      
        <div className="mt-6 flex flex-col items-start gap-4">
          
          <select 
            value={playlistStatus} 
            onChange={(e) => setPlaylistStatus(e.target.value)}
            className="p-2 rounded bg-white text-black"
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
      
          <button 
            onClick={() => handlePlaylist()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Create Playlist
          </button>
      
        </div>
      
      </div>
      
    )
}