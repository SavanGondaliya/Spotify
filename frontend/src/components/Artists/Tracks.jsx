import { useState, useEffect } from "react";
import axios from "axios";

const fetchTopTracks = async (setTracks) => {
    const session_details = sessionStorage.getItem("session_details");
    if (!session_details) return;

    const cachedData = localStorage.getItem("top_tracks");
    const cachedTime = localStorage.getItem("tracks_timestamp");

    if (cachedData && cachedTime && Date.now() - cachedTime < 86400000) {
        setTracks(JSON.parse(cachedData));
        return;
    }

    try {
        const response = await axios.get(
            `http://localhost:5000/populerTracks?session_details=${session_details}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        if (response.status === 200) {
            localStorage.setItem("top_tracks", JSON.stringify(response.data));
            localStorage.setItem("tracks_timestamp", Date.now().toString());
            setTracks(localStorage.getItem("top_tracks"));
        }
    } catch (error) {
        console.error("Error fetching tracks:", error);
    }
};

export const TopHits = () => {
    const [hitTracks, setTracks] = useState([]);
    
    useEffect(() => {
        fetchTopTracks(setTracks);
        const interval = setInterval(() => fetchTopTracks(setTracks), 86);

        return () => clearInterval(interval);
    }, []);
    
    return (
        <div>
            {
                hitTracks && Array(hitTracks).length > 0 ? (
                    <div className="w-full h-full flex bg-black">
                        {
                            hitTracks?.tracks?.map((track) => (
                                <div className="p-2">
                                    <div>
                                        <img src={track.album.images[0].url} alt="" />
                                        <p className="text-white">{track.name}</p>                                        
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                ):(
                    <div>Loading...</div>
                )
            }            
        </div>
    );
};

