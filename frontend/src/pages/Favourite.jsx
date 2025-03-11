import axios from "axios";
import React, { useRef } from "react";
import { useState,useEffect } from "react";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import { PlayerController } from "../components/User/Playler/Controller";
import { songDuration } from "../components/User/utility/SongManipulation";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import { KebabDropDown } from "../components/User/utility/KebabDropDown";
import { getUserPlaylist } from "../components/User/utility/SongManipulation";
import { addToLibrary,removeFromLibrary } from "../components/User/utility/SongManipulation";


export const LikedSongs = () => {

    const addref = useRef();
    const session_details = sessionStorage.getItem("session_details");
    const [favourite,setFavourite] = useState([]);
    const [tracks,setTracks] = useState([]);
    const [userPlaylists,setUserPlaylists] = useState([]);
    const [position,setPosition] = useState({bottom:0, right:0});
    const [activeIndex,setActiveIndex] = useState();
    console.log(tracks);

    
    const playlist = async() => {
        let playlist = await getUserPlaylist();
        setUserPlaylists(playlist)
    }
    
    const handleDropDown = (track_id) => {
        if(addref.current){
            const rect = addref.current.getBoundingClientRect();
            setPosition({ bottom: window.innerHeight - rect.bottom, right: window.innerWidth - rect.right });
        }
        setActiveIndex((prev) => prev === track_id ? null : track_id)
    }
        
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
                    setFavourite(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
            
        } catch (error) {
            return error
        }
    }

    const likedSongs = () => {
        try {
            
            axios.get(`http://localhost:5000/tracks?ids=${favourite.join(",")}&session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setTracks(res.data)
                }
            }).catch((err) => {
                setTracks(err)
            })

        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        likedSongIds()
        playlist();
    },[])

    useEffect(() => {
        likedSongs()
    },[favourite]);
    console.log(tracks?.tracks?.length);
    
    
    return(
        <div className="w-screen h-screen">
            <div className="flex flex-col flex-wrap w-full h-full">
                <div className="w-[100%] h-[88%]">
                    <div className="flex w-full h-full">
                        <div className="w-[15%] h-full">
                            <VerticalNavbar/>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-[100%]">
                                <HorizontalNavbar/>
                            </div>
                            <div className="container flex flex-col w-325 h-[88%] overflow-y-scroll">
                                {
                                    tracks && tracks?.tracks?.length > 0    ? (
                                        tracks?.tracks?.map((track,index) => (
                                            <div className="flex items-center">
                                                <div>
                                                    <img 
                                                        className="w-10 h-10"
                                                        src={track?.album?.images[0]?.url} alt="" />
                                                </div>
                                                <div className="w-full flex flex-col mx-4">
                                                    <h1>{track?.name}</h1>
                                                    <h1>
                                                        {
                                                            track?.artists?.map((artist) => (
                                                                <p>{artist?.name}</p>
                                                            ))
                                                        }
                                                    </h1>
                                                </div>
                                                <div>
                                                    <h1>{track?.album?.name}</h1>
                                                </div>
                                                <div>
                                                    <b>{songDuration(track?.duration_ms)}</b>
                                                </div>
                                                <div>
                                                     {
                                                        favourite && favourite.includes(track.id) ? (
                                                            <div onClick={() => {removeFromLibrary(track.id);
                                                                    setReRender((prev) => prev === track.id ? null : track.id)}}
                                                            >
                                                                <i class="ri-heart-fill"></i>
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
                                    ): (
                                        <div>Loading...</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[12%] bg-indigo-400">
                    <PlayerController/>
                </div>
            </div>
        </div>
    )
}