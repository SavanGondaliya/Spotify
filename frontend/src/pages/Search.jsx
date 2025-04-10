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
import MusicLoader from "../components/User/utility/Loader";
import { Queue } from "../components/User/Playler/Queue";


export const Search = () => {

    const {q} = useParams();
    const session_details = sessionStorage.getItem("secret_key");
    const [searchResult,setSearchResult] = useState();
    const [isQueueVisible,setIsQueueVisible] = useState();

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
    
    <div className="flex flex-grow overflow-hidden">
    
        <div className="w-[15%] h-full bg-gray-900">
            <VerticalNavbar />
        </div>

        <div className="flex flex-col flex-grow">

            <div className="w-full sticky top-0 bg-white shadow-md z-10">
                <HorizontalNavbar />
            </div>

            <div className="container flex flex-col flex-grow overflow-y-auto p-4">
                {searchResult ? (
                    <div className="w-full space-y-6">

                        <div className="flex justify-between gap-6">
                            <div className="w-1/3">
                                <TopResult topResult={searchResult?.tracks?.items[0]} />
                            </div>
                            <div className="w-2/3">
                                <Tracks tracks={searchResult?.tracks?.items} />
                            </div>
                        </div>

                        <Artists artists={searchResult?.artists?.items} />
                        <Albums albums={searchResult?.albums?.items} />
                        {isQueueVisible && (
                            <div className="fixed right-0 top-17 h-[89%] w-[400px] bg-[#0c0925] shadow-lg overflow-scroll">
                                <Queue isQueueVisible={isQueueVisible} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-lg font-semibold">
                        <MusicLoader />
                    </div>
                )}
            </div>
        </div>
    </div>

    <div className="w-full h-[12%] z-100">
        <PlayerController isQueueVisible={isQueueVisible} setIsQueueVisible={setIsQueueVisible} />
    </div>
        </div>

    )
}