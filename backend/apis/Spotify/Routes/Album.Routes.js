import express from "express";
import {  getAlbum, getAlbumTracks, populerAlbums,getMultipleAlbums  } from "../Controllers/Album.controller.js";

export const AlbumRoute = express.Router();

AlbumRoute.get("/album/:id",getAlbum);
AlbumRoute.get("/albums/",getMultipleAlbums);
AlbumRoute.get("/album/tracks/:id",getAlbumTracks);
AlbumRoute.get("/albums/populer",populerAlbums);

export default AlbumRoute;