import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

export const Queue = () => {

    const [currentQueue,setCurrentQueue] = useState([]);
    const session_details = sessionStorage.getItem("session_details");

    const getQueue = () => {

        axios.get(`http://localhost:5000/queue?session_details=${session_details}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {  
            if(res.status === 200){
                setCurrentQueue(currentQueue);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getQueue();
    },[]);
    
    return(
        <div>
            {
                currentQueue && currentQueue?.length > 0 ? (
                    <div>
                        {
                            
                        }
                    </div>
                ):(
                    <div>Loading</div>
                )
            }
        </div>
    )
}
