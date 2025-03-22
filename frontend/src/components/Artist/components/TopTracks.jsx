import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import MusicLoader from "../../User/utility/Loader";


export const TopTracks = () => {

    const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"))
    const [tracks,setTracks] = useState();
    const topTracks = () => {
        try {
            console.log("called Top tracks");
            console.log(artistDetails);
            
            const url =  `http://localhost:5000/toptracks?artist_id=${artistDetails.map((artist) => artist.artist_id)}`
            console.log(url);
            
            axios.get(url,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.status === 200){
                    setTracks(res.data)
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        topTracks();
    },[])

    return(
       
        <div className="px-10">
            <h1 className="text-2xl">Top Tracks</h1>
            {tracks && tracks.length > 0 ? (
                tracks.map((track, index) => (
                <div key={track.id || index} className="flex items-center w-full py-2 border-b">
                    <div className="w-1/6 flex justify-center">
                    <img className="w-10 h-10 rounded-md" src={track?.image} alt={track?.title} />
                    </div>

                    <div className="w-2/6">
                    <p className="font-semibold">{track?.title}</p>
                    <p className="text-gray-500 text-sm">{track?.artist_name}</p>
                    </div>

                    <div className="w-2/6">
                    <p className="text-gray-500 text-sm">{track?.album_name}</p>
                    </div>

                    <div className="w-1/6 text-right">
                    <p>
                        {Math.floor(track.duration / 60)}:
                        {String(Math.floor(track.duration % 60)).padStart(2, "0")}
                    </p>
                    </div>
                </div>
                ))
            ) : (
                <MusicLoader />
            )}
        </div>

    )
}


