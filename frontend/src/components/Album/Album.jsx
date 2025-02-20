import React, { useEffect, useState } from "react";
import { KPOP } from "./KPOP.jsx";
import { Bollywood } from "./Bollywood.jsx";

export const Album = () => {

    // const { id } = useParams();
    // const [albumDetails,setAlbumDetails] = useState([]);
    // const session_details = sessionStorage.getItem("session_details");

    // useEffect(() => {

    //     axios.get(`http://localhost:5000/album/${id}?session_details=${session_details}`,{
    //         headers:{
    //             "Content-Type":"application/json"
    //         }
    //     }).then((res) => {
    //         if(res.status === 200){
    //             setAlbumDetails(res.data)
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // },[id])
    // console.log(albumDetails);
    
    return(
        <div className="flex flex-col bg-black">
            <div>
                <h1 className="text-white text-2xl mx-5">Korean Pop </h1>
                <KPOP/>
            </div>
            <div>
                <h1 className="text-white text-2xl mx-5">Classic Bollywood</h1>
                <Bollywood/>
            </div>
        </div>
    )
}