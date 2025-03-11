import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

export const CreateAlbum = () => {

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

    return(

        <div>
            <div>
                <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Enter Album Name"
                    />
            </div>
            <div>
                <input
                    type="file"
                    onChange={(e) => setFileName(e.target.files[0])} 
                />
            </div>
            <div>
                <input
                    type="number"
                    value={totalTracks}
                    onChange={(e) => setTotalTracks(e.target.value)}
                    placeholder="Enter Track Number"
                />
            </div>
            <button onClick={handleCreate}>Create Album</button>
    </div>
    )
}
