import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

export const ArtistAlbums = () => {

    const [albums,setAlbums] = useState([]);
    const {id} = useParams();
    console.log(albums);
    
    const getArtistAlbums = () => {

        axios.get(`http://localhost:5000/local/${id}/albums`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                setAlbums(res.data)
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getArtistAlbums();
    },[])
    return(
        <div>
            {
                albums && albums.length > 0 ? (
                    albums.map((album) => (
                    <div>
                        <h1>{album.album_name}</h1>
                        <h1>{album.artist_name}</h1>
                        <h1>{album.total_tracks}</h1>
                        <h1>{album.albumImage}</h1>
                        <NavLink to={`http://localhost:5173/album/update/${album.album_id}`}>
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