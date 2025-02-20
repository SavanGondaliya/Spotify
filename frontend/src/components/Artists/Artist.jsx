import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

export const ArtistDetails = () => {

    const session_details = sessionStorage.getItem("session_details");
    const {id} = useParams();
    const [artistDetails,setArtistDetails] = useState([]);

    const artist = async() => {
        try {

            const response = await axios.get(`http://localhost:5000/localArtist/${id}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                setArtistDetails(response.data);
            }
        } catch (error) {
            setArtistDetails(error)
        }
    }

    useEffect(() => {
        artist();
    },[]);
    console.log(artistDetails);
    
    return(
        <div>
            {
            artistDetails && artistDetails.length > 0 ?(
                <div className="bg-black w-full h-full flex justify-around flex-col">
                    <div className="w-100 h-100">
                        <div className="relative inline-block container_shadow">
                            <img 
                                className="w-fit h-fit block rounded image_shadow"   
                                src={artistDetails[0].image} 
                                alt="" 
                            />
                            <div className="flex flex-col items-start absolute top-40 left-15">
                                <img
                                    className="w-25 h-25 inner_image_shadow "
                                    src={artistDetails[0].image} alt="" 
                                />
                                <p className="text-center text-4xl font-bold  my-3 highlight_text">{artistDetails[0].artist_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-indigo-800 w-fit h-fit p-10">
                        <p>{artistDetails[0].bio}</p>
                    </div>
            </div>
            
            ):(
                <p>Loading</p>
            )   
            }
        </div>
    )

}