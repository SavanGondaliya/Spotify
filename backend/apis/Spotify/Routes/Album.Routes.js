import express from "express";
import { checkAlbumForUser, deleteCurrentAlbum, getAlbum, getAlbumTracks, newRelease, saveCurrentAlbum, userSavedAlbums } from "../Controllers/Album.controller.js";

export const AlbumRoute = express.Router();

AlbumRoute.get("/user/albums",userSavedAlbums);
AlbumRoute.get("/album/:id",getAlbum);
AlbumRoute.get("/user/album/delete/:id",deleteCurrentAlbum);
AlbumRoute.get("/album/tracks/:id",getAlbumTracks);
AlbumRoute.get("/user/album/contain/:id",checkAlbumForUser);
AlbumRoute.get("/user/album/add/:id",saveCurrentAlbum);
AlbumRoute.get("/new-release",newRelease)

export default AlbumRoute;