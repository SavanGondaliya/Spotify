import React,{useEffect,useState} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { addTrackToPlaylist } from "../utility/SongManipulation";

export const RelatedArtist = () => {

    const session_details = sessionStorage.getItem("session_details");
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
    },[deviceId]);
    useEffect(() => {
        getRelatedArtist();
    },[relatedArtistId]);
    
    return(
        <div>
            {
                relatedArtists && Array(relatedArtists).length > 0 ? (
                    <div className="w-[100]% w-[100]% flex justify-between">
                        {
                            relatedArtists.artists.map((artist) => (
                                <div>
                                    <NavLink to={`http://localhost:5173/artist/${artist.id}`}>
                                        <img src={artist.images[0].url} className="w-20 h-20" alt="" />
                                        <p>{artist.name}</p>
                                    </NavLink>
                                </div>
                            ))   
                        }
                    </div>
                ):(
                    <div>Loading...</div>
                )
            }
        </div>
    )
}