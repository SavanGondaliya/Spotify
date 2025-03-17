import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { songDuration } from "../../User/utility/SongManipulation";

export const UpdateTrack = () => {

    const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));
    const [trackDetails,setTrackDetails] = useState([]);
    const {id} = useParams();
    
    const artist_id = artistDetails[0]?.artist_id;
    const [trackName,setTrackName] = useState("");
    const [trackId,setTrackId] = useState("");
    const [trackUrl,setTrackUrl] = useState("");
    const [albumName,setAlbumName] = useState("");
    const [album,setAlbum] = useState([]);
    const [trackNumber,setTrackNumber] = useState("");    
    const [trackDuration,setTrackDuration] = useState(0);    
 
    const updateTrack = () => {
        try {

            const formData = new FormData();
                        
            formData.append("track_id",trackId);
            formData.append("track_name",trackName);
            formData.append("track_url",trackUrl);
            formData.append("album_id",albumName);
            formData.append("track_number",trackNumber);
            formData.append("duration",trackDuration);
            
            axios.put(`http://localhost:5000/track/update/${artist_id}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res) => {
                if(res.status === 200){
                    console.log("Updated...");
                }
            }).catch((error) => {
                console.log(error);
            });            
        } catch (error) {
            console.log(error);           
        }
    }
    
    const getTrackDetails = () => {
        
        axios.get(`http://localhost:5000/track/${id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status ===200){
                setTrackId(res.data[0]?.song_id)
                setAlbumName(res.data[0]?.album_id)
                setTrackName(res.data[0]?.title)
                setTrackUrl(res.data[0]?.song_url)
                setTrackNumber(res.data[0]?.track_number)
                setTrackDuration(res.data[0]?.duration)
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const artistAlbums = () => {
        try {
            axios.get(`http://localhost:5000/local/${artist_id}/albums`,{
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

    useEffect(() => {
        getTrackDetails();
    },[]);
    
    return(
        <div>
            <div>
                <div>
                    <input 
                        type="text" 
                        value={trackName} 
                        onChange={(e) => setTrackName(e.target.value)}  
                        placeholder="Enter Track Name"
                    />
                </div>
                <div>
                    <select value={albumName}  onChange={(e) => setAlbumName(e.target.value)}>
                        {   
                            album.map((album) => (
                                <option value={album.album_id}>{album.album_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <input type="file"  onChange={(e) => setTrackUrl(e.target.files[0])}  placeholder="Enter Track Name"/>
                    <p>{`Selected File : ${trackUrl}`}</p>
                </div>
                <div>
                    <input type="number" value={trackNumber} onChange={(e) => setTrackNumber(e.target.value)}  placeholder="Enter Track Name"/>
                </div>
                <div>
                    <button onClick={() => updateTrack()}>Update Track</button>
                </div>
            </div>
        </div>
    )
}