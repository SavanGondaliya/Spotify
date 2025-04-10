import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import MusicLoader from "../../User/utility/Loader";

export const ArtistTracks = () => {

    const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));
    const [trackDetails,setTrackDetails] = useState([]);
    
    const getTrackDetails = () => {
        const url = `http://localhost:5000/${artistDetails[0]?.artist_id}/tracks`
        console.log(url);
        
        axios.get(url,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                setTrackDetails(res.data)
            }
        }).catch((err) => {
            return err
        })
    }
    console.log(trackDetails);
    
    useEffect(() => {
        getTrackDetails();
    },[]);

    return (
        <div>
            <div class="top-songs">
            <h2>Top Songs</h2>
            {
                trackDetails ? (
                    trackDetails.map((track) => (
                        <div class="songs">
                            <div class="song">
                                <img src={`http://localhost:5000${track.image}`} alt="album"/>
                                <div class="info">
                                    <div>{track?.title}<p class="artist">{track?.artist_name}</p>
                                    </div>
                                    <p class="album-name">{track?.album_name}</p>
                                </div>
                                <p>{Math.floor(track?.duration/60)}:{track?.duration%60}</p>
                            </div>
                        </div>
                    ))
                ):(
                    <div>
                        <MusicLoader />
                    </div>
                )
            }
            </div>
            <style>

            </style>
        </div>
    )
}
