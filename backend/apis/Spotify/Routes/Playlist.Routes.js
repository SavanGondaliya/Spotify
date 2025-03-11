import express from "express";
import { deleteUserPlaylist,addTrackToPlaylist, createPlaylist, deleteTrackFromPlaylist, getPlaylistById, getPlaylistTracks, getUserPlaylists } from "../Controllers/Playlist.controller.js";

export const playListRoute = express.Router();

playListRoute.get("/playlists/:playlistId",getPlaylistById);
playListRoute.get("/playlist/user/",getUserPlaylists);
// playListRoute.get("/playlist/:playlist_id/update",updatePlaylistDetails);
playListRoute.get("/playlist/:playlist_id/tracks",getPlaylistTracks);
playListRoute.post("/playlist/:playlist_id/add/:id",addTrackToPlaylist);
playListRoute.delete("/playlist/:playlist_id/delete/:id",deleteTrackFromPlaylist);
playListRoute.post("/playlist/create/",createPlaylist);
playListRoute.delete("/playlist/:playlist_id/delete",deleteUserPlaylist);

export default playListRoute;