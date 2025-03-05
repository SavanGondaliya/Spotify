import React,{useState,useEffect} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { useParams,NavLink } from "react-router-dom";
import axios from "axios";

export const FeaturedAlbum = () => {

    const session_details = sessionStorage.getItem("session_details");
    const [featuredAlbums,setFeaturedAlbums] = useState();
    const {player,deviceId} = useWebPlayback(); 
    const {id} = useParams();

    const getFeaturedAlbums = async() => {
        try {

            const response = await axios.get(`http://localhost:5000/artist/featured/${id}?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            
            if(response.status === 200){
                setFeaturedAlbums(response.data)
                caches.open('featured-album').then(cache => {
                    cache.put('/featuredAlbum', new Response(JSON.stringify({'featuredAlbum':featuredAlbums}),{
                        headers:{'Content-type':'application/json'}
                    }))
                });
            }
        } catch (error) {
            return error;
        }
    }
    
    useEffect(() => {
        getFeaturedAlbums();
    },[deviceId]);

    return(
        <div>
            {
                featuredAlbums && Array(featuredAlbums).length > 0 ? (
                    <div className="flex w-full h-full">
                        {
                            featuredAlbums.items.map((albums) => (
                                <div className="w-25 h-25">
                                    <NavLink
                                        to={`http://localhost:5173/album/${albums.id}`}>
                                        <img className="w-fit h-fit rounded" src={albums.images[0].url} alt="" />
                                        <p className="font-light">{albums.name}</p>
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