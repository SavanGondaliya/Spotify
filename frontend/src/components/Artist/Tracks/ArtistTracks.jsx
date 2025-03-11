import axios from "axios";
import { set } from "lodash";
import React from "react";
import {useState,useEffect} from "react";
import { NavLink, useParams } from "react-router-dom";

export const ArtistTracks = () => {

    const [trackDetails,setTrackDetails] = useState([]);
    const {id} = useParams();

    const getTrackDetails = () => {

        axios.get(`http://localhost:5000/${id}/tracks`,{
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
            {
                trackDetails && trackDetails.length > 0 ? (
                    trackDetails.map((track) => (
                            <div>
                            <div>
                                <h1>{track.title}</h1>
                            </div>
                            <NavLink to={`http://localhost:5173/track/update/${track.song_id}`}>
                                <button>Edit</button>
                            </NavLink>
                            </div>
                    ))
                ):(
                    <div>Loading...</div>
                )
            }
        </div>
    )
}
