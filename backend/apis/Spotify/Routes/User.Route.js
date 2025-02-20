import express from "express";
import { userProfile,userTopArtist,userTopTracks,getUserProfile,userArtist,followPlaylist,unfollowPlaylist, followArtist, unfollowArtist, unfollowUser, followUser } from "../Controllers/User.controller.js";

export const userRoute = express.Router();

userRoute.get('/user/profile',userProfile);
userRoute.get('/user/topArtist',userTopArtist);
userRoute.get('/user/topTracks',userTopTracks);
userRoute.get('/user/profile/:id',getUserProfile);
userRoute.get('/user/artists',userArtist);
userRoute.get('/playlist/:playlistId/follow',followPlaylist);
userRoute.get('/playlist/:playlistId/unfollow',unfollowPlaylist);
userRoute.get("/artist/follow/:artistId",followArtist);
userRoute.get("/user/follow/:userId",followUser);
userRoute.get("/artist/unfollow/:artistId",unfollowArtist);
userRoute.get("/user/unfollow/:userId",unfollowUser);

export default userRoute;