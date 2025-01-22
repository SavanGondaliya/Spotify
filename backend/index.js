"use strict"

// import Neccessary node packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2";
import {createDatabase,tblUser}from "./db.js";

// .env file configuration
dotenv.config()

// Database Configuration
export let conn = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "savan_33",
  database : process.env.DATABASE_NAME
});

conn.connect((error) => {
  if(error){
    console.log(error);
    return;
  }
  console.log("Connected to Database.");
  createDatabase();
  tblUser();
})

// server configuration
export const app = express();
app.listen(process.env.SERVER_PORT);
console.log(`server Running on Port ${process.env.SERVER_PORT}`);

// Middleware configuration
app.use(express.json())

// cors configuration
app.use(cors({
    origin : "https://api.spotify.com",
    methods : "['get','post','put','delete']",
    allowedHeaders : ['Content-type','Authorization']
}));

// Page Router
import { AuthRoutes } from "./apis/Spotify/Auth/Token.js"
import { TrackRouter } from "./apis/Spotify/Routes/Track.Route.js"
import { searchRoute } from "./apis/Spotify/Routes/Search.Route.js";
import { deviceRoute } from "./apis/Spotify/Routes/Device.Route.js";
import { playRoute } from "./apis/Spotify/Routes/Play.Route.js";
import { userRoute } from "./apis/Spotify/Routes/User.Route.js";
import { ArtistRoute } from "./apis/Spotify/Routes/Artist.Routes.js";
import { AlbumRoute } from "./apis/Spotify/Routes/Album.Routes.js";
import { playListRoute } from "./apis/Spotify/Routes/Playlist.Routes.js";

// Route Configuration
app.use("/",AuthRoutes);
app.use("/tracks",TrackRouter);
app.use("/",searchRoute);
app.use("/",deviceRoute);
app.use("/",playRoute);
app.use("/",userRoute);
app.use("/",ArtistRoute);
app.use("/",AlbumRoute);
app.use("/",playListRoute);

export default conn