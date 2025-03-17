import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";

export const ArtistAlbums = () => {

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
        <div className="container"> 
            <div className="top-songs">
            <div className="w-full">
                {
                    albums && albums.length > 0 ? (
                        albums.map((album) => (                            
                            <NavLink to={`http://localhost:5173/albums/${album?.album_id}`} className="songs">
                                <div className="song">
                                    <img src={`http://localhost:5000${album.albumImage}`} alt="album"/>
                                    <div className="info">
                                        <div>{album?.album_name}<p class="artist">{album?.artist_name}</p>
                                        </div>
                                        <p className="album-name">{album.total_tracks}</p>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    ):(
                        <div>Loading...</div>
                    )
                }
                </div>
            </div>
            <style>
                {
                    `
                    
                    .container {
                        position: relative;
                        bottom: 15px;
                        width: 100%;
                    }

                    .top-songs{
                        margin-top: 40px;
                    }
                    .songs {
                        width: 95%;
                        position: relative;
                        bottom: 20px;
                    }

                    .songs .song {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 0;
                    }

                    .songs .song .info {
                        display: flex;
                        align-items: center;
                    }

                    .song img {
                        width: 50px;
                        height: 45px;
                        border-radius: 5px;
                        background-color: #282870;
                        margin-right: 15px;
                        box-shadow: 2px 2px 0px 1px #4949bf;

                    }

                    .song .info {
                        display: flex;
                        justify-content: space-around;
                        width: 100%;
                        position: relative;
                        right: 9em;
                        top: 4px;
                    }

                    .song .info p {
                        margin: 0;
                    }

                    .song .info .artist {
                        color: #aaa;
                        font-size: 13px;
                    }

                    `
                }
            </style>
        </div>
    )
}