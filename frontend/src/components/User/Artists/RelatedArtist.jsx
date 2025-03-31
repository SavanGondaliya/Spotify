import React,{useEffect,useState} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { div } from "framer-motion/client";

export const RelatedArtist = () => {

    const session_details = sessionStorage.getItem("secret_key");
    const {player,deviceId} = useWebPlayback();
    const [relatedArtistId,setRelatedArtistId] = useState([]);
    const [relatedArtists,setRelatedArtists] = useState();
    const {id} = useParams();

    const getRelatedArtistIds = async() => {
        try {
            
            const response = await axios.get(`http://localhost:5000/relatedArtist?artist_id=${id}`,{
                headers:{
                    "Content-Type":"Application/json"
                }
            });
            
            if(response.status === 200){
                let string = [];
                response.data.forEach((artist) => {
                    string.push(artist.artist_id)                    
                })
                setRelatedArtistId(string)
            }            
        } catch (error) {
            return error;
        }
    }


    const getRelatedArtist = async() => {   
        try {
            
            const url = `http://localhost:5000/artists?ids=${relatedArtistId.join(",")}&session_details=${session_details}`
            
            const response = await axios.get(url,{
                headers:{
                    "Content-Type":"Application/json"
                }
            });
            
            if(response.status === 200){
                setRelatedArtists(response.data)
            }
        } catch (error) {
            return error;
        }
    }
    
    useEffect(() => {   
        getRelatedArtistIds();
    },[player,id]);
    
    useEffect(() => {
        getRelatedArtist();
    },[relatedArtistId]);
    
    return (
        <div className="w-full">
            {relatedArtists?.artists?.length > 0 ? (
                <div>
                    <div className="text-2xl mx-5 mb-2">
                        <h1>Related Artists</h1>
                    </div>
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 px-4">
                    {relatedArtists.artists.filter((artist) => artist?.id != id ).map((artist) => (
                        <div key={artist.id} className="flex flex-col items-center">
                        <NavLink to={`/artist/${artist.id}`}>
                            <img
                            src={artist.images[0]?.url}
                            className="__related_artist__ w-24 h-24 rounded-full shadow-lg  border-indigo-500 transition-transform transform hover:scale-105"
                            alt={artist.name}
                            />
                            <p className="text-white text-center mt-2 font-semibold">{artist.name}</p>
                        </NavLink>
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <div className="text-white text-center p-4"></div>
            )}
            <style>
                {
                    `
                    .__related_artist__{
                        box-shadow : 5px 5px 0px #4949bf;
                    }
                    `
                }
            </style>
        </div>

    );
}
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */