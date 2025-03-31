import axios from "axios";
import React, { useEffect, useState } from "react";

export const UpdateTrack = ({ setVisible, refresh, track }) => {

    const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));
    const artist_id = artistDetails?.[0]?.artist_id;
    const [trackName, setTrackName] = useState("");
    const [trackId, setTrackId] = useState("");
    const [trackUrl, setTrackUrl] = useState(null);
    const [albumName, setAlbumName] = useState("");
    const [album, setAlbum] = useState([]);
    const [trackNumber, setTrackNumber] = useState("");
    const [trackDuration, setTrackDuration] = useState(0);

    useEffect(() => {
        if (track) {
            setTrackId(track.song_id);
            setTrackName(track.title);
            setTrackUrl(track.song_url);
            setAlbumName(track.album_id);
            setTrackNumber(track.track_number);
            setTrackDuration(track.duration);
        }
        artistAlbums();
    }, [track]);

    const updateTrack = () => {
        try {
            const formData = new FormData();
            formData.append("track_id", trackId);
            formData.append("track_name", trackName);
            formData.append("track_url", trackUrl);
            formData.append("album_id", albumName);
            formData.append("track_number", trackNumber);
            formData.append("duration", trackDuration);
            console.log([...formData])
            axios.put(`http://localhost:5000/track/update/${artist_id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then((res) => {
                if (res.status === 200) {
                    refresh((prev) => !prev);
                    setVisible(false);
                }
            }).catch(console.log);
        } catch (error) {
            console.log(error);
        }
    };

    const artistAlbums = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/local/${artist_id}/albums`, {
                headers: { "Content-Type": "application/json" }
            });
            if (res.status === 200) setAlbum(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-[#282870] p-6 shadow-lg z-50 flex flex-col gap-5 justify-center">
            <h2 className="text-white text-2xl font-semibold text-center">Update Track</h2>

            <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Track Name</label>
                <input
                    type="text"
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    placeholder="Enter Track Name"
                    className="p-2 bg-white rounded-md outline-none text-black"
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Select Album</label>
                <select
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    className="p-2 bg-white rounded-md outline-none text-black"
                >
                    {album.map((album) => (
                        <option key={album.album_id} value={album.album_id}>{album.album_name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Choose Track File</label>
                <input
                    type="file"
                    onChange={(e) => setTrackUrl(e.target.files[0])}
                    className="p-2 bg-white rounded-md outline-none"
                />
                <p className="text-white">{trackUrl ? `Selected File: ${trackUrl.name || "Existing file"}` : "No file selected"}</p>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-white font-medium">Track Number</label>
                <input
                    type="number"
                    value={trackNumber}
                    onChange={(e) => setTrackNumber(e.target.value)}
                    placeholder="Enter Track Number"
                    className="p-2 bg-white rounded-md outline-none text-black"
                />
            </div>

            <div className="flex gap-3 mt-5">
                <button
                    onClick={updateTrack}
                    className="w-1/2 bg-[#ffba53] hover:bg-[#f2c178] text-black font-semibold py-2 rounded-md shadow-md"
                >
                    Update Track
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
