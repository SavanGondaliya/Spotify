import React,{useEffect,useState} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

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
    
    return(
        <div className="w-full">
            {relatedArtists?.artists?.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {relatedArtists.artists.map((artist) => (
                        <div key={artist.id} className="flex flex-col items-center">
                            <NavLink to={`http://localhost:5173/artist/${artist.id}`}>
                                <img src={artist.images[0]?.url} className="w-20 h-20 rounded-full" alt={artist.name} />
                                <p className="text-white text-center mt-2">{artist.name}</p>
                            </NavLink>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-white">Loading...</div>
            )}
        </div>
    )
}