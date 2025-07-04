import axios from "axios";
import React  from "react";
import { useState,useEffect,useCallback,useRef } from "react";
import MusicLoader from "../utility/Loader";
import { Play,Pause } from "../utility/SongManipulation";
import useWebPlayback from "../utility/WebPlayBackSDK";

export const TopHits = () => {

    const session_details = sessionStorage.getItem("secret_key");
    const [ids,setIds] = useState();
    const [topHits,setTopHits] = useState();
    const [isPlay, setIsPlay] = useState(null);
    const { player, deviceId } = useWebPlayback();
    const [positionMs, setPositionMs] = useState(0);


      useEffect(() => {
        if (!player) return;
    
        const handlePlayerStateChange = (state) => {
          if (!state) {
            return;
          }
        };
    
        player.addListener("player_state_changed", handlePlayerStateChange);
    
        player.getCurrentState().then((state) => {
          if (!state) {
            return;
          }
          console.log(state);
          setPositionMs(state?.position);
        });
        return () =>
          player.removeListener("player_state_changed", handlePlayerStateChange);
      }, [player]);
    
      
    const handleMusic = useCallback((id, type) => {
        if (isPlay === id) {
            Pause(id, deviceId);
            setIsPlay(null);
        } else {
            if(id != isPlay){
                setPositionMs(0)
            }
            Play(id, deviceId, type, positionMs);
            setIsPlay(id);
        }
    }, [isPlay, deviceId, positionMs]);
    

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
        <div className="flex flex-col justify-center  items-center px-5 py-5 overflow-scroll">
            <div className="flex flex-col w-fit h-fit py-5">
                <div>
                    <h1 className="text-4xl mx-5">Top Hits</h1>
                </div>
                <div className="flex ">
                    {
                        topHits && typeof(topHits) == "object" ? (
                            topHits.tracks.map((track) => (
                                <div className="w-full h-full">
                                    <div className="w-30 h-50 mx-5 py-5" onClick={() => handleMusic(track?.id,"track")}>
                                        <img
                                            className="w-full h-full object-cover rounded shadow-lg __top_hits__"
                                            src={track?.album?.images[0]?.url} 
                                            alt="" 
                                        />
                                    </div>
                                    <div className="text-center">
                                        {track?.name}
                                    </div>
                                </div>
                            ))
                        ):(
                            <div>
                                <MusicLoader/>
                            </div>
                        )
                    }
                </div>
            </div>
            <style jsx>
                {
                    `
                        .__top_hits__{
                            box-shadow: 8px 8px 0px #4949bf;
                        }
                    `
                    // /* // 282870 // 4949bf // 935d07 // f2c178 // 05040c */
                }
            </style>
        </div>
    )
}