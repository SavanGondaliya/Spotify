import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import CreateAlbum from "./CreateAlbum";
import { UpdateAlbum } from "./UpdateAlbum";
import { UpdateTrack } from "./UpdateTrack";
import MusicLoader from "../../User/utility/Loader";

export const ArtistAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [albumTracks, setAlbumTracks] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateAlbumForm, setShowUpdateAlbumForm] = useState(false);
  const [showUpdateTrackForm, setShowUpdateTrackForm] = useState(false);
  const [album,setAlbum] = useState([]);
  console.log(albumTracks);
    
  useEffect(() => {
    const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"))?.[0];
    if (!artistDetails) return;
    const url = `http://localhost:5000/local/${artistDetails.artist_id}/albums`;

    axios.get(url, { headers: { "Content-Type": "application/json" } })
      .then((res) => res.status === 200 && setAlbums(res.data))
      .catch(console.log);
  }, [refresh]);

  useEffect(() => {
    
    axios.get(`http://localhost:5000/album/local/${album.album_id}`, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      if (res.status === 200) {
          setAlbumTracks(res.data);
          setSelectedAlbumId(album.album_id);
        }
      })
      .catch(console.log);
      
    },[refresh]);

  const deleteAlbum = (id) => {
    axios.delete(`http://localhost:5000/local/album/delete/${id}`, { headers: { "Content-Type": "application/json" } })
      .then((res) => res.status === 200 && setRefresh((prev) => prev + 1))
      .catch(console.log);
  };

  const deleteTrack = (trackId) => {
    axios.delete(`http://localhost:5000/track/delete/${trackId}`, { headers: { "Content-Type": "application/json" } })
      .then((res) => res.status === 200 && setRefresh((prev) => prev + 1))
      .catch(console.log);
  };

  return (
    <div className="flex h-full min-h-screen overflow-hidden">
      <div className="w-1/5 text-white">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full p-6 space-y-6 overflow-y-auto min-h-0">
        <div>
          {selectedAlbumId ? (
            // Display Tracks of Selected Album
            <div>
              <button onClick={() => setSelectedAlbumId(null)} className="bg-[#f2c178] __btn_add__ text-white px-4 py-2 mb-4">
                Back to Albums
              </button>
              <div className="text-xl font-semibold text-white mb-4">
                {albumTracks ? albumTracks[0]?.album_name : <MusicLoader />}
              </div>
              <div className="space-y-4">
                {albumTracks ? albumTracks.map((track) => (
                  <div key={track?.song_id} className="flex items-center  p-4 rounded-lg shadow-md">
                    <img className="w-16 h-16 object-cover rounded-md" src={track?.artistImage} alt="Album Cover" />
                    <div className="flex flex-col flex-grow px-4 text-white">
                      <h1 className="text-lg font-bold">{track?.title}</h1>
                      <p className="text-sm text-gray-400">{track?.artist_name}</p>
                    </div>
                    <div className="text-white w-1/5">{track?.album_name}</div>
                    <div className="text-white w-1/5 text-center">{track?.track_number}</div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedTrack(track);
                          setShowUpdateTrackForm(true);
                        }} 
                        className="__album_btn__ text-white bg-[#282870] px-4 py-2 "
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteTrack(track?.song_id)} className="__album_btn__ bg-[#282870]  text-white px-4 py-2 ">
                        Delete
                      </button>
                    </div>
                  </div>
                )) : <MusicLoader />}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-4">
                <button onClick={() => setShowForm((prev) => !prev)} className="__btn_add__ bg-[#f2c178] text-white px-4 py-2 ">Add Album</button>
                {showForm && <CreateAlbum visible={showForm} setVisible={setShowForm} refresh={setRefresh} />}
                <input className="w-64 h-10 bg-white px-2 py-1 rounded outline text-black " type="text" placeholder="Search albums..." />
              </div>
              <div className="w-full overflow-x-auto">
                {albums.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#2c2c6c] text-white">
                        <th className="p-3">Album Cover</th>
                        <th className="p-3">Album Name</th>
                        <th className="p-3">Artist</th>
                        <th className="p-3">Total Tracks</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {albums.map((album) => (
                        <tr key={album.album_id} className="border-b border-indigo-900 ">
                          <td className="p-3">
                            <img src={album.albumImage} alt="album" className="w-16 h-16 object-cover rounded-md" />
                          </td>
                          <td className="p-3 text-white cursor-pointer" onClick={() => {setRefresh((prev) => !prev),setAlbum(album)}}>
                            {album.album_name}
                          </td>
                          <td className="p-3 text-gray-300">{album.artist_name}</td>
                          <td className="p-3 text-center text-white">{album.total_tracks}</td>
                          <td className="p-3">
                            <button onClick={() => deleteAlbum(album.album_id)} className="bg-[#282870] __album_btn__ text-white px-3 py-1 mr-5">
                              Delete
                            </button>
                            <button 
                              
                              onClick={() => {
                                setSelectedAlbum(album);
                                setShowUpdateAlbumForm(true);
                              }} 
                              className="bg-[#282870] __album_btn__ text-white px-3 py-1"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-white text-lg font-semibold">Artist Has No Album Yet</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showUpdateAlbumForm && <UpdateAlbum setVisible={setShowUpdateAlbumForm} refresh={setRefresh} album={selectedAlbum} />}
      {showUpdateTrackForm && <UpdateTrack setVisible={setShowUpdateTrackForm} refresh={setRefresh} track={selectedTrack} />}
      <style>
        {`
          .__album_btn__{
            box-shadow: 3px 3px 0px #4949bf;
          }
          .__btn_add__{
            box-shadow : 3px 3px 0px #935d07;
          }
        `}
      </style>
    </div>
  );
};
// 282870
// 4949bf
// 935d07
// f2c178
// 05040c */