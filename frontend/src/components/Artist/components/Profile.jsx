import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { AddTrack } from "./AddTrack";

const ArtistProfile = () => {

    const [artist,setArtist] = useState();
    const [showForm,setShowForm] = useState(false)
    
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
    
    useEffect(()=> {
        getArtistDetails();
    },[]);
    
    return(
        <div className="container">
            {artist?.map((artist) => (
                <div className="artist-header" key={artist.artist_id}>
                    <img 
                        src={`http://localhost:5000${artist?.image}`} 
                        alt={artist?.artist_name} 
                        className="artist-img"
                    />
                    <div className="artist-info">
                        <h1>{artist?.artist_name}</h1>
                        <button className="add-song" onClick={() => setShowForm((prev) => !prev)}>Add Song</button>
                        {showForm && <AddTrack visible={showForm} setVisible={setShowForm} />}
                    </div>
                    <div className="song-count">
                        {artist?.total_songs ?? 0} <br/> Songs
                    </div>
                </div>
            ))}
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
export default ArtistProfile