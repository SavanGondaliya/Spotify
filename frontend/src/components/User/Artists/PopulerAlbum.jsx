import React,{useState,useEffect} from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { useParams,NavLink } from "react-router-dom";
import axios from "axios";

export const PopulerAlbum = () => {

    const session_details = sessionStorage.getItem("secret_key");
    const [populerAlbums,setPopulerAlbums] = useState();
    const {deviceId} = useWebPlayback(); 
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
    },[deviceId,id]);
    
    return(
        <div className="w-full h-full">
        <h3 className="text-white text-lg mb-6 text-center">Populer Albums</h3>
      
        {populerAlbums?.items?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {populerAlbums.items.map((album) => (
              <div key={album.id} className="flex flex-col items-center w-full">
                <NavLink to={`http://localhost:5173/album/${album.id}`} className="flex flex-col items-center w-full">
                  <img className="w-28 h-28 md:w-32 md:h-32 rounded-lg shadow-lg" src={album.images[0].url} alt={album.name} />
                  <p className="font-light text-white text-center mt-3 px-2">{album.name}</p>
                </NavLink>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-center mt-6">Loading...</div>
        )}
      </div>
      
    
    )
}