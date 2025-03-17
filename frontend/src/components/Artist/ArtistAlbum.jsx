import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

export const ArtistAlbumPage = () => {

    
    const [albums,setAlbums] = useState([]);
    
    
    const getArtistAlbums = () => {
        const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"))[0];
        axios.get(`http://localhost:5000/local/${artistDetails?.artist_id}/albums`,{
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
    console.log(albums);

    return(
        <div>   
            <div className="mt-6">
                <h2 className="text-white text-xl font-bold">Top Albums</h2>
                <div className="flex space-x-4 mt-4 overflow-x-auto">
                <div class="top-albums">
                <h2>Top Albums</h2>
                <div class="albums-container">
                    <div class="albums">
                {albums.map((album) => (
                    <div class="album">
                        <div class="album-box">
                            <img src={album.image} alt="Image not Found" srcset="" />
                        </div>
                        <span>{album.album_name}</span>
                    </div>
                ))}
                </div>
                </div>
            </div>
                </div>
            </div>
        </div>
    )

}   
