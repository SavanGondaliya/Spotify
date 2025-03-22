// import axios from "axios";
// import React from "react";
// import { useState,useEffect,useRef } from "react";
// import { useParams } from "react-router-dom";
// import MusicLoader from "../utility/Loader";

// const PlaylistDetails = () => {

//     const session_details = sessionStorage.getItem("session_details");
//     const {id} = useParams
//     const [details,setDetails] = useState(null);
//     const getPlaylistDetail = () => {
        
//         axios.get(`http://localhost:5000/playlist/${id}/details?session_details=${session_details}`,{
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }).then((res) => {
//             if(res.status === 200){
//                 setDetails(res.data)
//             }
//         }).catch((error) => {
//             console.log(error);
            
//         })
//     }

//     useEffect(() => {
//         getPlaylistDetail()
//     },[]);

//     return(
//         <div>
//             {
//                 details != null ? (

//                 ):(
//                     <MusicLoader/>
//                 )
//             }
//         </div>
//     )

// }

// export default PlaylistDetails;