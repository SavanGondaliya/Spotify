import React,{useState,useEffect} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { useParams,NavLink } from "react-router-dom";
import axios from "axios";
import MusicLoader from "../utility/Loader";

export const FeaturedAlbum = () => {

    const session_details = sessionStorage.getItem("secret_key");
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
        <div className="w-full h-full">
    <h3 className="text-white text-lg mb-4">Featured Albums</h3>

    {featuredAlbums?.items?.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
            {featuredAlbums.items.map((album) => (
                <div key={album.id} className="flex flex-col items-center">
                    <NavLink to={`http://localhost:5173/album/${album.id}`}>
                        <img className="w-24 h-24 rounded" src={album.images[0].url} alt={album.name} />
                        <p className="font-light text-white text-center mt-2">{album.name}</p>
                    </NavLink>       
                </div>
            ))}
        </div>
    ) : (
        <div className="text-white">
            <MusicLoader/>
        </div>
    )}
</div>

    )
}