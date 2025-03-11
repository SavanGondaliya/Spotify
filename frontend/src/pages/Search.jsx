import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HorizontalNavbar from "../components/User/Navbar/HorizontalNavbar";
import VerticalNavbar from "../components/User/Navbar/VerticalNavbar";
import { PlayerController } from "../components/User/Playler/Controller";
import { Tracks } from "../components/User/Search/Tracks";
import { Albums } from "../components/User/Search/Album";
import { Artists } from "../components/User/Search/Artist";
import { TopResult } from "../components/User/Search/TopResult";

export const Search = () => {

    const {q} = useParams();
    const session_details = sessionStorage.getItem("secret_key");
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
            <div className="w-screen h-screen">
            <div className="flex flex-col flex-wrap w-full h-full">
                <div className="w-[100%] h-[88%]">
                    <div className="flex w-full h-full">
                        <div className="w-[15%] h-full">
                            <VerticalNavbar/>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-[100%] sticky top-0">
                                <HorizontalNavbar/>
                            </div>
                            <div className="container flex flex-col w-[100%] h-[88%] overflow-y-scroll">
                                { searchResult ? (
                                    <div className="w-full">
                                        <div className="flex justify-around">
                                           <TopResult topResult={searchResult?.tracks?.items[0]} />
                                           <Tracks tracks={searchResult?.tracks?.items}/>
                                        </div>
                                        <Artists artists={searchResult?.artists?.items}/>
                                        <Albums albums={searchResult?.albums?.items}/>
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
    )
}