import express from "express";
import { deleteUserPlaylist,addTrackToPlaylist, createPlaylist, deleteFromPlaylistTracks, getPlaylistById, getPlaylistCoverImage, getPlaylistTracks, getUserPlaylists, otherUserPlaylist, setPlaylistCoverImage, updatePlaylistDetails } from "../Controllers/Playlist.controller.js";

export const playListRoute = express.Router();

playListRoute.get("/playlists/:playlistId",getPlaylistById);
playListRoute.get("/playlist/user/",getUserPlaylists);
playListRoute.get("/playlist/:playlistId/update",updatePlaylistDetails);
playListRoute.get("/playlist/:playlistId/tracks",getPlaylistTracks);
playListRoute.get("/playlist/:playlistId/add/:id",addTrackToPlaylist);
playListRoute.get("/playlist/:playlistId/delete/:id",deleteFromPlaylistTracks);
playListRoute.get("/playlist/user/:userId",otherUserPlaylist);
playListRoute.post("/playlist/create/",createPlaylist);
playListRoute.get("/playlist/:playlistId/image",getPlaylistCoverImage);
playListRoute.get("/playlist/:playlistId/image/add",setPlaylistCoverImage);
playListRoute.delete("/playlist/:playlist_id/delete",deleteUserPlaylist);

export default playListRoute;