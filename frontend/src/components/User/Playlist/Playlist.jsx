import axios from "axios";
import React,{useEffect,useState} from "react";
import {  useParams } from "react-router-dom";
import { Play,Pause,songDuration,getCurrentState,deleteFromPlaylist } from "../utility/SongManipulation";
import { useWebPlayback } from "../utility/WebPlayBackSDK";


export const Playlist = () => {

    const session_details = sessionStorage.getItem("session_details");
    const {playlist_id} = useParams();
    const {player,deviceId} = useWebPlayback();
    const [isPlay,setIsPlay] = useState(null);
    const [positionMs,setPositionMs] = useState(0);
    const [currentState,setCurrentState] = useState();
    const [playlistTracks,setplayListTracks] = useState();
    const [playlistTrackIds,setplayListTrackIds] = useState("");

    const getPlaylistTracks = async() => {
        try {
            
            const response = await axios.get(`http://localhost:5000/playlist/${playlist_id}/tracks?session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(response.status === 200){
                setplayListTrackIds(response.data[0].song_id)
            }
        } catch (error) {
            return error
        }
    }

    const getTrackdetails = async() => {
        try {

            
            const response = await axios.get(`http://localhost:5000/tracks?ids=${playlistTrackIds}&session_details=${session_details}`,{
                headers:{
                    "Content-Type":"application/json"
                }
            });

            if(response.status === 200){
                setplayListTracks(response.data)
            }

        } catch (error) {
            return error;
        }
    }

    const handleMusic = (id, type) => {
        if (isPlay == id) {
            Pause(id, deviceId);
            setIsPlay(null);
        } else {
            Play(id, deviceId, type, positionMs);
            setIsPlay(id);
        }
    };

    useEffect(() => {getPlaylistTracks();},[playlist_id])
    useEffect(() => {getTrackdetails();},[playlistTrackIds])
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
    }, [player]);
        

    return(
        <div>
            <div>

            </div>
            <div>
                {
                    playlistTracks? (
                        <div>
                            {
                                playlistTracks.tracks.map((track) => (
                                    <div className="w-[100%] h-[100%]">
                                        <div>
                                            <img onClick={() => handleMusic(track.id,"track")} className="w-20 h-20" src={track.album.images[0].url} alt="" />
                                        </div>
                                        <div className="w-full h-full">
                                            <p>{track.name}</p>
                                        </div>
                                        <div>
                                            <p>{track.album.name}</p>
                                        </div>
                                        <div onClick={() => deleteFromPlaylist(playlist_id,track.id)}>
                                            <button>
                                                delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ):(
                        <div>
                            loading...
                        </div>
                    )
                }
            </div>
        </div>
    )

}


