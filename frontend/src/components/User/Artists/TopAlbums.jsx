import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

export const TopAlbum = () => {

    const secret_key = sessionStorage.getItem('secret_key');
    const [albums,setAlbums] = useState([]);

    const topAlbums = () => {
        
        try {   
            const url = `http://localhost:5000/albums/populer?session_details=${encodeURIComponent(secret_key)}`; 
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setAlbums(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        topAlbums();
    },[]);
    
    return(
        <div className="flex flex-col justify-center  items-center px-5 py-5 "> 
            <div className="flex flex-col w-fit h-fit py-5">
                <div>
                    Top Albums
                </div>
                <div className="flex">
                    {
                        albums && albums?.tracks?.length > 0 ? (
                            albums?.tracks.map((album) => (
                                <NavLink to={`http://localhost:5173/album/${album?.album?.id}`}>
                                    <div className="mx-5 py-5">
                                        <img src={album?.album?.images[0]?.url} alt="" srcset="" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-center">{album?.album?.name}</p>
                                    </div>
                                </NavLink>
                            ))
                        ):(
                            <div>Loading....</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
