import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HorizontalNavbar from "../components/Navbar/HorizontalNavbar";
import VerticalNavbar from "../components/Navbar/VerticalNavbar";
import { PlayerController } from "../components/Playler/Controller";
import { Tracks } from "../components/Search/Tracks";
import { Albums } from "../components/Search/Album";
import { Artists } from "../components/Search/Artist";

export const Search = () => {

    const {q} = useParams();
    const session_details = sessionStorage.getItem("session_details");
    const [searchResult,setSearchResult] = useState();

    const search = async() => {
        try {
            const url = `http://localhost:5000/search?q=${encodeURIComponent(q)}&session_details=${encodeURIComponent(session_details)}`
            
            const response = await axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            
            if(response.status === 200){
                setSearchResult(response.data)
            }
        } catch (error) {
            return error;
        }
    }
    
    useEffect(() => {
        if(q){
            search().catch((err) => console.error(err)
            )
        }
    },[q]);

        
    return(
        <div>
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
                            <div className="container flex flex-col w-300 h-[88%] overflow-y-scroll">
                                { searchResult ? (
                                    <div className="w-full">
                                        <Tracks tracks={searchResult.tracks.items}/>
                                        <Artists artists={searchResult.artists.items}/>
                                        <Albums albums={searchResult.albums.items}/>
                                    </div>                                    
                                ):(
                                    <div>
                                        Loading....
                                    </div>
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
        </div>
    )
}