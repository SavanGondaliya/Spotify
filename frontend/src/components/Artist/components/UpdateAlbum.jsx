import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const UpdateAlbum = ({ setVisible, refresh }) => {
    const { id } = useParams();
    const [albumName, setAlbumName] = useState("");
    const [fileName, setFileName] = useState(null);
    const [totalTracks, setTotalTracks] = useState("");
    const [artistId, setArtistId] = useState("");
    const [albumId, setAlbumId] = useState("");

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("album_name", albumName);
            formData.append("image", fileName);
            formData.append("total_tracks", totalTracks);
            formData.append("artist_id", artistId);
            formData.append("album_id", albumId);
            
            console.log([...formData]);
            
            axios.post(`http://localhost:5000/local/album/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.status === 200) {
                    refresh((prev) => !prev);
                }
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    const getAlbum = () => {
        try {
            axios.get(`http://localhost:5000/local/album/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setAlbumName(res?.data[0]?.album_name);
                    setFileName(res?.data[0]?.albumImage);
                    setTotalTracks(res?.data[0]?.total_tracks);
                    setArtistId(res?.data[0]?.artist_id);
                    setAlbumId(res?.data[0]?.album_id);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAlbum();
    }, []);

    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-[#282870] p-6 shadow-lg z-50 flex flex-col gap-5 justify-center">
            <h2 className="text-white text-2xl font-semibold text-center">Update Album</h2>
            
            <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Album Name</label>
                <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Enter Album Name"
                    className="p-2 bg-white rounded-md outline-none text-black"
                />
            </div>
            
            <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Choose Album Image</label>
                <input
                    type="file"
                    onChange={(e) => setFileName(e.target.files[0])}
                    className="p-2 bg-white rounded-md outline-none"
                />
                <p className="text-white">{fileName ? `Selected File: ${fileName.name}` : "No file selected"}</p>
            </div>
            
            <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Total Tracks</label>
                <input
                    type="number"
                    value={totalTracks}
                    onChange={(e) => setTotalTracks(e.target.value)}
                    placeholder="Enter Total Tracks"
                    className="p-2 bg-white rounded-md outline-none text-black"
                />
            </div>
            
            <div className="flex gap-3 mt-5">
                <button
                    onClick={handleUpdate}
                    className="w-1/2 bg-[#ffba53] hover:bg-[#f2c178] text-black font-semibold py-2 rounded-md shadow-md"
                >
                    Update Album
                </button>
                <button
                    onClick={() => setVisible(false)}
                    className="w-1/2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded-md shadow-md"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
