import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import MusicLoader from "../utility/Loader";

const TopArtists = ({artists}) => {

    const [topArtists,setTopArtists] = useState();
    console.log(artists);
    
    useEffect(() => {
        const url = `http://localhost:5000/artists?ids=${artists.map((artist) => artist[0]).join(",")}&session_details=${session_details}`
        console.log(url);
        
        axios.get(url,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200   ){
                setTopArtists(res.data)
            }
        }).catch((error) =>{
            console.log(error);
        });
    },[])
    return(
        <div>
            {
                topArtists && typeof(topArtists) == '' ?(
                    topArtists.map((artist) => (
                        <div>
                            <h1>{artist?.name}</h1>
                        </div>
                    ))
                ):(
                    <MusicLoader/>
                )
            }
        </div>
    )
}

export default TopArtists;