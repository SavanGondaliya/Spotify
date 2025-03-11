import axios from "axios";
import React, { useEffect, useState } from "react";
import { Play,Pause } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { useParams } from "react-router-dom";
import "./style.css";

export const ArtistDetails = () => {

    const session_details = sessionStorage.getItem("secret_key");
    const {id} = useParams();
    const [artistDetails,setArtistDetails] = useState("");
    const [localArtist,setLocalArtist] = useState("");
    const {player,deviceId} = useWebPlayback();
    const [currentState,setCurrentState] = useState("");
    const [positionMs,setPositionMs] = useState();
    const [isPlay,setIsPlay] = useState(null);
    
    const artist = async() => {
        try {
            
            const url  = `http://localhost:5000/artist/${id}?session_details=${session_details}`
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((response) => {
                if(response.status === 200){
                    setArtistDetails(response.data);
                }
            }).catch((error) => {
                setArtistDetails(error)
            });
            
            axios.get(`http://localhost:5000/localArtist/${id}?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((response) => {
                if(response.status === 200){
                    setLocalArtist(response.data);
                }
            }).catch((error) => {
                setLocalArtist(error)
            })

        } catch (error) {
            setArtistDetails(error)
        }
    }

    
      useEffect(() => {
        if (!player) return;
        player.addListener("ready", () => {
          player.getCurrentState().then((state) => {
            if (!state) {
              return;
            }
            setPositionMs(state.position);
            setCurrentState(state);
          });
        });
      }, [isPlay,player]);
    
      const handleMusic = (id, type) => {
        if (isPlay == id) {
          Pause(id, deviceId);
          setIsPlay(null);
        } else {
          setPositionMs(0)
          Play(id, deviceId, type, positionMs);
          setIsPlay(id);
        }
      };
    
    useEffect(() => {
        artist();
    },[id]);
    return(
        <div>
            {
            (artistDetails && typeof(artistDetails) == "object" ) && localArtist ?(
                <div className="flex justify-around flex-col">
                    <div className="w-full h-full">
                        <div className="relative inline-block container_shadow">
                            <img 
                                className="w-100 h-100 block rounded image_shadow"   
                                src={artistDetails ? (artistDetails?.images[0]?.url) : (localArtist[0]?.image)} 
                            />
                            <div className="flex flex-col items-start absolute top-40 left-15">
                                <img
                                    className="w-25 h-25 inner_image_shadow "
                                    src={artistDetails ? (artistDetails?.images[0]?.url) : (localArtist[0]?.image)} alt="" 
                                />
                                <p className="text-center text-4xl font-bold  my-3 highlight_text">{artistDetails ? artistDetails?.name : localArtist[0]?.artist_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div onClick={() => handleMusic(artistDetails?.id,"artist")}>
                            {currentState && currentState?.paused == true ? (
                                <i class="ri-play-circle-fill"></i>
                            ):(
                                <i class="ri-pause-circle-fill"></i>
                            )
                         }
                        </div>
                        <div>
                            <i class="ri-shuffle-fill"></i>
                        </div>
                        <div>
                            <i class="ri-more-2-fill"></i>
                        </div>
                    </div>
                    <div className="bg-indigo-900 w-100 h-100 rounded p-5 text-start container_shadow">
                        
                        <div className="bg-indigo-400 w-[100%] h-[100%] p-5 rounded overflow-y-scroll lyrics_container">
                        {
                            localArtist ? 
                            (
                                <p>{localArtist[0]?.bio}</p>
                            ):(
                                <h1 className="text-2xl">bio Not Found</h1>
                            )
                        }
                        </div>
                    </div>
            </div>        
            ):(
                <p>Loading</p>
            )   
            }
        </div>
    )
}