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
            <div className="w-full h-full flex rounded">
                <div className="w-full h-full rounded px-2">
                    <img className="w-[30]% h-50 shadow-lg" src={PlaylistBase64} alt="" srcset="" />
                </div>
                <div className="w-[70]% h-full">
                    <div className="w-fit h-fit py-5">
                        <input 
                            type="text" 
                            name="Playlist_name"
                            value={playlistName}
                            placeholder="PlaylistName"
                            onChange={(e) => setPlaylistName(e.target.value)} 
                        />
                    </div>
                    <div className="h-fit w-fit py-5">
                        <input 
                            type="text" 
                            name="playlist_bio"
                            value={playlistBio}
                            placeholder="Playlist Bio"
                            onChange={(e) => setplaylistBio(e.target.value) }
                        />
                    </div>
                </div>
            </div>
            <div className="h-full w-full">
                <div className="h-fit w-fit">
                    <select name="" id="" value={playlistStatus} onChange={(e) => setPlaylistStatus(e.target.value)}>
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select>
                </div>
                <div>
                    <button onClick={() => handlePlaylist()}>Create playlist</button>
                </div>
            </div>
        </div>
    )
}