import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";


export const TopTracks = () => {

    const artistDetails = JSON.parse(localStorage.getItem("artistDetails"))
    const [tracks,setTracks] = useState();
    const topTracks = () => {
        try {
            axios.get(`http://localhost:5000/toptracks?artist_id=${artistDetails[0]?.artist_id}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setTracks(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        topTracks();
    },[])

    return(
        <div>
            {
                tracks ? (

                <div>
                    
                </div>
                ):(<div></div>)
            }
            <style>

            </style>
        </div>
    )
}


