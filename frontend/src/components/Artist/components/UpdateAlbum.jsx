import axios from "axios";
import { update } from "lodash";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export const UpdateAlbum = () => {

    const {id} = useParams();
    const [albumName,setAlbumName] = useState("");
    const [fileName,setFileName] = useState("");
    const [totalTracks,setTotalTracks] = useState("");
    const [artistId,setArtistId] = useState("");
    const [albumId,setAlbumId] = useState("");

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("album_name", albumName);
            formData.append("image", fileName); 
            formData.append("total_tracks", totalTracks);
            formData.append("artist_id", artistId);
            formData.append("album_id", albumId);
            
            console.log([...formData]); 
            
            axios.post(`http://localhost:5000/local/album/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.status === 200) {
                    console.log("Album Updated...");
                }
            }).catch((err) => {
                console.log(err);
            });
        
        } catch (error) {
            console.log(error);
        }
    };
    
    const getAlbum = () => {
        try {
            axios.get(`http://localhost:5000/local/album/${id}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    console.log(res.data);
                    
                    setAlbumName(res?.data[0]?.album_name);
                    setFileName(res?.data[0]?.albumImage);
                    setTotalTracks(res?.data[0]?.total_tracks);
                    setArtistId(res?.data[0]?.artist_id);
                    setAlbumId(res?.data[0]?.album_id);
                }
            })
        } catch (error) {
            return error   
        }
    }

    useEffect(() => {
        getAlbum();
    },[]);

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
            <p>{`Selected File is ${fileName}`}</p>
        </div>
        <div>
            <input
                type="number"
                value={totalTracks}
                onChange={(e) => setTotalTracks(e.target.value)}
                placeholder="Enter Track Number"
                />
        </div>
        <button onClick={handleUpdate}>Update Album</button>
</div>
)

}