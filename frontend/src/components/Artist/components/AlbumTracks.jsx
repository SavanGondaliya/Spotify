import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicLoader from "../../User/utility/Loader";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";

const AlbumTracks = () => {

    const [albumTracks,setAlbumTracks] = useState();
    const [refresh,setRefresh] = useState(0);
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/album/local/${id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                setAlbumTracks(res.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    },[refresh]);

    const deleteTrack = (id) => {
        axios.delete(`http://localhost:5000/track/delete/${id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res) => {
            if(res.status === 200){
                setRefresh(refresh+1)
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
    
            <div className="flex h-screen">
              {/* Sidebar */}
              <div className="w-1/5 bg-gray-900 text-white">
                <Sidebar />
              </div>
          
              {/* Main Content */}
              <div className="flex flex-col w-4/5 p-6 space-y-6 overflow-y-auto">
                {/* Album Title or Loader */}
                <div className="text-xl font-semibold text-white">
                  {albumTracks ? albumTracks[0]?.album_name : <MusicLoader />}
                </div>
          
                {/* Track List */}
                <div className="space-y-4">
                  {albumTracks ? (
                    albumTracks.map((track) => (
                      <div key={track?.song_id} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
                        {/* Album Image */}
                        <div className="w-16 h-16 flex-shrink-0">
                          <img className="w-full h-full object-cover rounded-md" src={track?.albumImage} alt="Album Cover" />
                        </div>
          
                        {/* Track Details */}
                        <div className="flex flex-col flex-grow px-4 text-white">
                          <h1 className="text-lg font-bold">{track?.title}</h1>
                          <p className="text-sm text-gray-400">{track?.artist_name}</p>
                        </div>
          
                        {/* Album Name */}
                        <div className="text-white w-1/5">{track?.album_name}</div>
          
                        {/* Track Number */}
                        <div className="text-white w-1/5 text-center">{track?.track_number}</div>
          
                        {/* Actions */}
                        <div className="flex space-x-2">
                          <NavLink to={`/track/update/${track?.song_id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
                          </NavLink>
                          <button 
                            onClick={() => deleteTrack(track?.song_id)} 
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <MusicLoader />
                  )}
                </div>
              </div>
            </div>
          );
        
}

export default AlbumTracks;