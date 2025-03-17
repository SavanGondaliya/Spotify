import axios from "axios";
import React  from "react";
import { useState,useEffect } from "react";

export const TopHits = () => {

    const session_details = sessionStorage.getItem("secret_key");
    const [ids,setIds] = useState();
    const [topHits,setTopHits] = useState();

    const topHitsIds = () => {
        try {

            axios.get(`http://localhost:5000/top-hits`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setIds(res.data)
                }
            }).catch((error) => {
                console.log(error);
                
            })

        } catch (error) {
            return error
        }
    }

    const getTopHits = () => {
        try {
            const url = `http://localhost:5000/tracks?ids=${ids.map(id => id[0]).join(",")}&session_details=${session_details}`;     
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setTopHits(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        topHitsIds();
    },[]);

    useEffect(() => {
        getTopHits();
    },[ids])
    
    return(
        <div className="flex flex-col justify-center  items-center px-5 py-5">
            <div className="flex flex-col w-fit h-fit py-5">
                <div>
                    <h1>Top Hits</h1>
                </div>
                <div className="flex ">
                    {
                        topHits && typeof(topHits) == "object" ? (
                            topHits.tracks.map((track) => (
                                <div>
                                    <div className="mx-5 py-5">
                                        <img className="w-40 h-40 object-cover shadow-lg  album_shadow " src={track?.album?.images[0]?.url} alt="" />
                                    </div>
                                    <div className="text-center">
                                        {track?.name}
                                    </div>
                                </div>
                            ))
                        ):(
                            <div>Loading...</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}