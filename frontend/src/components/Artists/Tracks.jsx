import React, { useEffect,useState } from "react";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import axios from "axios";

export const Tracks = () => {

    const session_details = sessionStorage.getItem("session_details");
    const player = useWebPlayback();
    const [deviceId,setDeviceId] = useState(null);
    const [albumId,setAlbumId] = useState([]);
    
    let index = 1261;    
    const getTrackDetails = async(album_id,delay = 10000) => {

        try {
            let id = album_id[index].album_id;
            console.log(id);
            console.log(index);
            const response  = await axios.get(`http://localhost:5000/album/tracks/${id}?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                console.log(response.data);
                index += 1
                setTimeout(() => {
                    getTrackDetails(album_id)
                }, delay);
            }
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        if(!player) return
        player.addListener("ready",({device_id}) => {
            setDeviceId(device_id)
        });

        axios.get(`http://localhost:5000/albumids`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                setAlbumId(res.data);  
            }
        })
    },[player])

    useEffect(() => {
        getTrackDetails(albumId);
    },[deviceId]);

    return(
        <div>
            <h1>Tracks</h1>
        </div>
    )
}