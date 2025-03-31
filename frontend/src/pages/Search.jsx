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
        <div className="w-screen h-screen flex flex-col">
    {/* Main Content */}
    <div className="flex flex-grow overflow-hidden">
        {/* Sidebar (Fixed) */}
        <div className="w-[15%] h-full bg-gray-900">
            <VerticalNavbar />
        </div>

        {/* Main Section (Right Side) */}
        <div className="flex flex-col flex-grow">
            {/* Horizontal Navbar (Fixed) */}
            <div className="w-full sticky top-0 bg-white shadow-md z-10">
                <HorizontalNavbar />
            </div>

            {/* Scrollable Main Content */}
            <div className="container flex flex-col flex-grow overflow-y-auto p-4">
                {searchResult ? (
                    <div className="w-full space-y-6">
                        {/* Top Result & Tracks (Side by Side) */}
                        <div className="flex justify-between gap-6">
                            <div className="w-1/3">
                                <TopResult topResult={searchResult?.tracks?.items[0]} />
                            </div>
                            <div className="w-2/3">
                                <Tracks tracks={searchResult?.tracks?.items} />
                            </div>
                        </div>

                        {/* Artists & Albums */}
                        <Artists artists={searchResult?.artists?.items} />
                        <Albums albums={searchResult?.albums?.items} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-lg font-semibold">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    </div>

    {/* Player Controller (Fixed at Bottom) */}
    <div className="w-full h-[12%] bg-indigo-400 flex items-center justify-center">
        <PlayerController />
    </div>
        </div>

    )
}