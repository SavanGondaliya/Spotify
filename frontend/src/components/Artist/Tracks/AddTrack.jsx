import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

export const  AddTrack = () => {

    const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));
    const [trackName,setTrackName] = useState("");
    const [trackUrl,setTrackUrl] = useState();
    const [albumName,setAlbumName] = useState("");
    const [album,setAlbum] = useState([]);
    const [trackNumber,setTrackNumber] = useState([]);

    const handleTrack = () => {
        try {   
            const formData = new FormData();
                        
            formData.append("track_name",trackName);
            formData.append("track_url",trackUrl);
            formData.append("album_id",albumName);
            formData.append("track_number",trackNumber);
            
            axios.post(`http://localhost:5000/track/add`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res) => {
                if(res.status === 200){
                    console.log("song added");
                }
            }).catch((error) => {
                console.log(error);
            });

        } catch (error) {
            return error;
        }
    }
    console.log(album);
    
    const artistAlbums = () => {
        try {
            axios.get(`http://localhost:5000/local/${artistDetails[0]?.artist_id}/albums`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){                
                    setAlbum(res.data);
                }
            })
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        artistAlbums();
    },[]);

    return(
        <div>
            <div>
                <label for="songTitle">Song Name</label>
                <input 
                    id="songTitle"
                    type="text" 
                    value={trackName} 
                    onChange={(e) => setTrackName(e.target.value)}  
                    placeholder="Enter Track Name"
                />
            </div>
            <div>
                <select name="" id="" onChange={(e) => setAlbumName(e.target.value)}>
                    {
                        album && album.length > 0 ?(
                            album.map((album) => (
                                
                                <option value={album.album_id}>{album.album_name}</option>
                            ))
                        ):(
                                <option value="">Choose The Album</option>
                        )
                    }
                </select>
            </div>
            <div>
                <label for="songFile">Choose File</label>
                <input type="file"  onChange={(e) => setTrackUrl(e.target.files[0])}  placeholder="Enter Track Name"/>
            </div>
            <div>
                <label for="songFile">Track Number</label>
                <input type="number" value={trackNumber} onChange={(e) => setTrackNumber(e.target.value)}  placeholder="Enter Track Name"/>
            </div>
            <div>
                
              <button id="submitSong" onClick={() => handleTrack()} classNameName="submit-btn">
                Add Song
              </button>
                           
            </div>
        </div>
    )   
}
