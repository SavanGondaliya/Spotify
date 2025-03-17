import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";

export const ArtistProfile = () => {

    const [artist,setArtist] = useState();
    
    const getArtistDetails = () => {
        try {
            const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));
            const url = `http://localhost:5000/local/artist/${artistDetails[0]?.artist_id}`;
            console.log(url);
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setArtist(res.data)
                } 
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            return error;
        }
    }
    console.log(artist);
    
    useEffect(()=> {
        getArtistDetails();
    },[]);
    
    return(
        <div className="container">
            {/* {artist?.map((artist) => (
                <div className="artist-header" key={artist.artist_id}>
                    <img 
                        src={`http://localhost:5000${artist?.image}`} 
                        alt={artist?.artist_name} 
                        className="artist-img"
                    />
                    <div className="artist-info">
                        <h1>{artist?.artist_name}</h1>
                        <button className="add-song">Add Song</button>
                    </div>
                    <div className="song-count">
                        {artist?.total_songs ?? 0} <br/> Songs
                    </div>
                </div>
            ))} */}
            <div className="bg-indigo-800 text-yellow-400 p-6 flex items-center justify-between shadow-lg">
            <div className="flex items-center">
                <img src="/artist.jpg" alt="Artist" className="w-24 h-24 bg-yellow-400 shadow-md" />
                <div className="ml-4">
                <h1 className="text-3xl font-bold">Arijit Singh</h1>
                <p>42,906,817 monthly listeners</p>
                <button className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded">Add Song</button>
                </div>
            </div>
            <div className="bg-yellow-400 px-4 py-2 text-black font-bold shadow-md">1.5k Songs</div>
            </div>
            <style>
                {
                `   
                 ::-webkit-scrollbar {
                        display: none;
                    }

                    ::placeholder {
                        color: #666666;
                        font-size: .8rem;
                    }
                    .artist-header {
                        display: flex;
                        align-items: center;
                        background-color: #282870;
                        padding: 10px 45px;
                        box-shadow: 5px 5px 0px #4949bf;
                    }
                    .container {
                        position: relative;
                        bottom: 15px;
                        width: 100%;
                    }

                    .artist-img {
                        width: 110px;
                        height: 110px;
                        background-color: #ffba53;
                        box-shadow: 5px 5px 0px #4949bf;
                        margin-right: 25px;
                    }

                    .artist-info h1 {
                        margin: 0;
                        color: #ffba53;
                        position: relative;
                        top: 25px;
                        font-size: 3rem;
                    }

                    .artist-info p {
                        position: relative;
                        bottom: 5px;
                    }

                    .add-song {
                        background-color: #ffba53;
                        box-shadow: 2px 2px 0px 1px #935d07;
                        border: none;
                        padding: 5px 25px;
                        color: #000000;
                        font-weight: 500;
                        margin-top: 10px;
                        position: relative;
                        bottom: 27px;
                        cursor: pointer;
                        font-size: 1.1rem;
                    }
                    .add-song:hover{
                        background-color: #f2c178;
                    }

                    .song-count {
                        background-color: #ffba53;
                        padding: 10px 20px;
                        font-weight: 600;
                        font-size: 1.2rem;
                        text-align: center;
                        color: #000000;
                        box-shadow: 4px 4px 0px #935d07;
                        margin-left: auto;
                    }
                `}
            </style>
        </div>        
    )
}