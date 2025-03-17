import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { useWebPlayback } from "../utility/WebPlayBackSDK";
import { Play,Pause,songDuration, addToLibrary, removeFromLibrary } from "../utility/SongManipulation";
import { getUserPlaylist } from "../utility/SongManipulation";
import { KebabDropDown } from "../utility/KebabDropDown";

export const PopulterTracks = () => {

    const session_details = sessionStorage.getItem("secret_key");
    const {player,deviceId} = useWebPlayback();
    const addref  = useRef(null);

    const [populerTracks,setPopulerTracks] = useState();
    const [isPlay,setIsPlay] = useState(false);
    const [positionMs,setPositionMs] = useState(0);
    const [position,setPosition] = useState({bottom:0, right:-20});
    const [currentState,setCurrentState] = useState(null);
    const [userPlaylists,setUserPlaylists] = useState([]);
    const [savedTracks,setSavedTracks] = useState([]);
    const [activeIndex,setActiveIndex] = useState();
    const [reRender,setReRender] = useState();
    const {id} = useParams();
        
    const likedSongIds = () => {
        try {

            const url = `http://localhost:5000/track/saved_tracks?session_details=${session_details}`
            console.log(url);
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setSavedTracks(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
            
        } catch (error) {
            return error
        }
    }
    
    const playlist = async() => {
        let playlist = await getUserPlaylist();
        setUserPlaylists(playlist)
    }
    
    const handleDropDown = (track_id) => {
        if(addref.current){
            const rect = addref.current.getBoundingClientRect();
            setPosition({bottom: rect.bottom,right: rect.right})
        }
        setActiveIndex((prev) => prev === track_id ? null : track_id)
    }
    
    const artistTracks = async() => {
        try {
            
            const response = await axios.get(`http://localhost:5000/artist/top-tracks/${id}?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            
            if(response.status === 200){
                setPopulerTracks(response.data)
            }
        } catch (error) {
            return error
        }
    }
    
    useEffect(() => {
        likedSongIds();
    },[reRender])

    useEffect(() => {
        artistTracks();        
        playlist();
        likedSongIds();
    },[deviceId,id]);

    
    useEffect(() => {
        if (!player) return;
            player.getCurrentState().then(state => {
                if(!state){
                    return;
                }
                setCurrentState(state);
                setPositionMs(state.position)
            })
    },[isPlay]);
    
    const handleMusic = (id,type) => {
        if(isPlay == id){
            Pause(id,deviceId)
            setIsPlay(null);
        }else{
            Play(id,deviceId,type,positionMs);
            setIsPlay(id);
        }
    }
    
    return(
            populerTracks && Array(populerTracks).length > 0 ? (
                <div className="w-full h-100 overflow-y-scroll m-5">
                    <h1 className="text-white text-2xl">Populer</h1>
                    <div>
                        {
                            populerTracks.tracks.map((track,index) => (
                                <div className="flex items-center justify-between px-2 py-3 hover:bg-indigo-600">
                                    <div key={index}>
                                        <h3>{index+1}</h3>
                                    </div>
                                    <div className="w-full flex justify-center items-center" onClick={() => handleMusic(track.id,"track")}>
                                        <img 
                                            className="w-15 h-15 rounded populer_image"
                                            src={track.album.images[0].url} 
                                            alt="" 
                                        />
                                    </div>
                                    <div className="w-full mx-4">
                                        <p className="highlight__text text-white">{track.name}</p>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-white">{songDuration(track.duration_ms)}</p>
                                    </div>
                                    <div className="w-full relative">
                                        {
                                            savedTracks && savedTracks.includes(track.id) ? (
                                                <div onClick={() => {removeFromLibrary(track.id);
                                                      setReRender((prev) => prev === track.id ? null : track.id)}}
                                                >
                                                    <i class="ri-checkbox-circle-fill"></i>
                                                </div>
                                            ):(
                                                <div 
                                                    onClick={
                                                        () => {addToLibrary(track.id);
                                                        setReRender((prev) => prev === track.id ? null :track.id)}
                                                    }
                                                >
                                                    <i className="playlist_status ri-add-line text-white "></i>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="w-full">
                                        <div ref={addref} onClick={() => handleDropDown(index)} className="z-10"  style={{ bottom: position.bottom, right: position.right }}>
                                            <i className="ri-more-2-fill text-white"></i>
                                            <div className="absolute text-white"> 
                                                {activeIndex === index && <KebabDropDown playlists={userPlaylists} artists={track.artists} track_id={track.id} /> }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ):(
                <div>
                    Loading...
                </div>
            )
    )
}

