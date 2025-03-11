import express from "express";
    
import { addTrack, createAlbum,getArtistAlbums,deleteTrack, getArtistTracks, getTrackById, updateTrack, deleteAlbum,RegisterArtist, getAlbumById, updateAlbum, ArtistLogin, getArtistById } from "./Controller.js";

export const ArtistsRoutes = express.Router();

ArtistsRoutes.post(`/album/create`,createAlbum);
ArtistsRoutes.post(`/artist/register`,RegisterArtist);
ArtistsRoutes.post(`/artist/login`,ArtistLogin);
ArtistsRoutes.get('/local/:id/albums/',getArtistAlbums);
ArtistsRoutes.get('/local/artist/:id',getArtistById);
ArtistsRoutes.get('/local/album/:id',getAlbumById);
ArtistsRoutes.delete('/local/album/delete/:id',deleteAlbum);
ArtistsRoutes.post('/local/album/update/:id',updateAlbum);
ArtistsRoutes.post('/track/add',addTrack);
ArtistsRoutes.delete('/track/delete/:id',deleteTrack);
ArtistsRoutes.get('/:id/tracks',getArtistTracks);
ArtistsRoutes.get('/track/:id',getTrackById);
ArtistsRoutes.put('/track/update/:id',updateTrack);