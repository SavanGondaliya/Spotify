import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import MusicLoader from "../components/User/utility/Loader";
import { useParams } from "react-router-dom";
import MonthlyReport  from "../components/User/utility/Report";

export const Profile = () => {

    
    const [user,setUser] = useState(null);
    const {id} = useParams();
    useEffect(() => {

        axios.get(`http://localhost:5000/user/profile/${id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                setUser(res.data)
            }
        }).catch((error) => {
            console.log(error);
        });
    },[]);  
    
    return(
        <div>
            {
                user && user != null ? (
                    user.map((element) => (
                        <div className="w-10 h-50">
                            <h1 className="text-amber-300">
                                {element?.name}
                                {element?.totalPlaylist}
                            </h1>
                        </div>
                    ))
                ):(
                    <MusicLoader/>
                )
            }
            <MonthlyReport/>
        </div>
    )
}
