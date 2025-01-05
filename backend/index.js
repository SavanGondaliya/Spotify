"use strict"

// import Neccessary node packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CryptoJs from "crypto-js";

// .env file configuration
dotenv.config()

// import configuration variables
import { PORT,localStorage } from "./config.js";
import AuthRoutes from "./apis/Spotify/Auth/Token.js"
import { TrackRouter } from "./apis/Spotify/Routes/Track.Routes.js";

// server configuration
export const app = express();
app.listen(PORT);

console.log(`Server Running on ${PORT}`);

// cors configuration
app.use(cors({
    origin : "https://api.spotify.com",
    methods : "['get','post','put','delete']",
    allowedHeaders : ['Content-type','Authorization']
}));

// Route Configuration
app.use("/",AuthRoutes);
app.use("/",TrackRouter)

/* Some Necessary Function which is supportive
   to get the Authentication accessToken. */
export const generateRandomString  = (length) => {

    // A function that return a encrypted random string for state
    let randomString = ""
    const STATESTRING = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const SECRET_KEY = process.env.SECRET_KEY;

    for(let i=0;i<length;i++){
        randomString += STATESTRING[Math.floor(Math.random()*STATESTRING.length)]
    }
    return CryptoJs.AES.encrypt(randomString,SECRET_KEY).toString();
  }

export const storeTolocalStorage = (accessToken,refreshToken) => {
    
    let incryptedAccessToken = CryptoJs.AES.encrypt(accessToken,"ACCESS_TOKEN")
    let incryptedRefreshAccessToken = CryptoJs.AES.encrypt(refreshToken,"REFRESH_TOKEN")

    localStorage.setItem("ACCESS_TOKEN",incryptedAccessToken);
    localStorage.setItem("REFRESH_TOKEN",incryptedRefreshAccessToken);
    console.log("Both Token Successfully setted.");
  }
  