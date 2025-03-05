import React,{useState,useEffect} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { useParams,NavLink } from "react-router-dom";
import axios from "axios";

export const PopulerAlbum = () => {

    const session_details = sessionStorage.getItem("session_details");
    const [populerAlbums,setPopulerAlbums] = useState();
    const {player,deviceId} = useWebPlayback(); 
    const {id} = useParams();

    const getPopulerAlbums = async() => {
        try {
                        
            const response = await axios.get(`http://localhost:5000/artist/albums/${id}?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            
            if(response.status === 200){
                setPopulerAlbums(response.data)
            }
        } catch (error) {
            return error;
        }
    }
    
    useEffect(() => {
        getPopulerAlbums();
    },[deviceId]);

    return(
        <div className="w-full h-full">
            {
                populerAlbums && Array(populerAlbums).length > 0 ? (
                    <div className="grid grid-cols-3 place-items-center">
                        {
                            populerAlbums.items.map((albums) => (
                                <div className="flex justify-center w-full h-full">
                                    <NavLink
                                        to={`http://localhost:5173/album/${albums.id}`}>
                                        <img className="w-20 h-20 populer_album_image rounded" src={albums.images[0].url} alt="" />
                                        <p className="font-light text-white text-center">{albums.name}</p>
                                    </NavLink>       
                                </div>
                            ))
                        }
                    </div>
                ):(
                    <div>Loading</div>
                )
            }
        </div>
    )
}