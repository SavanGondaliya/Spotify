import express from "express";
import { addToPlaylistTracks, createPlaylist, deleteFromPlaylistTracks, getPlaylistById, getPlaylistCoverImage, getPlaylistTracks, getUserPlaylist, otherUserPlaylist, setPlaylistCoverImage, updatePlaylistDetails } from "../Controllers/Playlist.controller.js";

export const playListRoute = express.Router();

playListRoute.get("/playlists/:playlistId",getPlaylistById);
playListRoute.get("/playlist/user/",getUserPlaylist);
playListRoute.get("/playlist/:playlistId/update",updatePlaylistDetails);
playListRoute.get("/playlist/:playlistId/tracks",getPlaylistTracks);
playListRoute.get("/playlist/:playlistId/add/:id",addToPlaylistTracks);
playListRoute.get("/playlist/:playlistId/delete/:id",deleteFromPlaylistTracks);
playListRoute.get("/playlist/user/:userId",otherUserPlaylist);
playListRoute.get("/playlist/create/:userId",createPlaylist);
playListRoute.get("/playlist/:playlistId/image",getPlaylistCoverImage);
playListRoute.get("/playlist/:playlistId/image/add",setPlaylistCoverImage);

export default playListRoute;