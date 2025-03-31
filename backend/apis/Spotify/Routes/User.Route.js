import express from "express";
import { userProfile,userTopArtist,userTopTracks,userReports,getUserProfile,userArtist,followPlaylist,unfollowPlaylist,followArtist, unfollowArtist, unfollowUser, followUser, updateMonthlyReport, getMonthlyReport, updatePassword } from "../Controllers/User.controller.js";
import { verifyOtp } from "../Controllers/User.controller.js";

export const userRoute = express.Router();

userRoute.get('/user/profile/:id',userProfile);
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
userRoute.post("/user/report",updateMonthlyReport);
userRoute.get("/user/report",getMonthlyReport);
userRoute.get("/reports",userReports)
userRoute.post("/otp/verify",verifyOtp)
userRoute.post("/password/update",updatePassword)

export default userRoute;