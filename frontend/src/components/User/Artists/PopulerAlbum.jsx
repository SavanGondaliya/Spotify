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
        <h3 className="text-white text-2xl mb-6 mx-5">Populer Albums</h3>
      
        {populerAlbums?.items?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {populerAlbums.items.map((album) => (
              <div key={album.id} className="flex flex-col items-center w-full">
                <NavLink to={`http://localhost:5173/album/${album.id}`} className="flex flex-col items-center w-fit">
                  <img className="w-20 h-20 md:w-20 md:h-20 rounded-lg shadow-lg __populer_album_image__" src={album.images[0].url} alt={album.name} />
                  <p className="font-light text-white text-center mt-3 px-2">{album.name}</p>
                </NavLink>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-center mt-6">Loading...</div>
        )}
        <style>
          {
            `
              .__populer_album_image__{
                box-shadow: 5px 5px 0px #935d07;
                border-radius: 5px;
              }
            `
          }
        </style>
      </div>   
    )
}