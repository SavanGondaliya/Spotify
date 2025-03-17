import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

export const TrendingSong = () => {

    const secret_details = sessionStorage.getItem("secret_key");
    const [trendingId,setTrendingId] = useState();
    const [trendingSong,setTrendingSong] = useState();

    useEffect(() => {

        axios.get(`http://localhost:5000/trending`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                setTrendingId(res.data)
            }
        }).catch((error) => {
            console.log(error);
        });
    },[]);

    const getTrendingSong = () => {
        try {
           
            const url = `http://localhost:5000/tracks/${trendingId[0]}?session_details=${secret_details}`
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setTrendingSong(res.data)
                }
            }).catch((error) => {
                console.log(error);
            });

        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getTrendingSong();
    },[trendingId])
    
        return(
        <div className="w-[100%] h-[100%]">
            {
                trendingSong && typeof(trendingSong) == 'object' ? (
                    <div className="bg-indigo-900 flex w-[80%] h-80 my-15 mx-5">
                        <div className="">
                            <h1>Trending Now Hits</h1>
                            <h1>{trendingSong.name}</h1>
                            <h1>{trendingId[1]} Plays</h1>
                        </div>
                        <div className="relative left-100 bottom-10">
                            <img className="w-40 h-40" src={trendingSong?.album?.images[0]?.url} alt="" />
                        </div>
                    </div>
                ):(
                    <div>Loading...</div>
                )
            }
        </div>
    )

}