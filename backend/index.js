"use strict"

// import Neccessary node packages
import express from "express";
import dotenv from "dotenv";
import CryptoJs from "crypto-js"
import cors from "cors";
import request from "request";
import querystring from "querystring"


// .env file configuration
dotenv.config()

// import configuration variables
import { PORT,localStorage,accessToken } from "./config.js";

// server configuration
const app = express();
app.listen(PORT);
console.log(`Server Running on ${PORT}`);


// cors configuration
app.use(cors({
    origin : "https://api.spotify.com",
    methods : "['get','post','put','delete']",
    allowedHeaders : ['Content-type','Authorization']
}))


// secret keys
const client_id = `${process.env.CLIENT_ID}`;
const redirect_uri = `http://${process.env.SERVER_ADDRESS}:${PORT}/callback`;
const client_secret = `${process.env.CLIENT_SECRET}`;


const generateRandomString  = (length) => {

    // A function that return a encrypted random string for state

    let randomString = ""
    const STATESTRING = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const SECRET_KEY = process.env.SECRET_KEY;

    for(let i=0;i<length;i++){
        randomString += STATESTRING[Math.floor(Math.random()*STATESTRING.length)]
    }
    return CryptoJs.AES.encrypt(randomString,SECRET_KEY).toString();

}


const storeTolocalStorage = (accessToken,refreshToken) => {

    
    let incryptedAccessToken = CryptoJs.AES.encrypt(accessToken,"ACCESS_TOKEN")
    let incryptedRefreshAccessToken = CryptoJs.AES.encrypt(refreshToken,"REFRESH_TOKEN")

    localStorage.setItem("ACCESS_TOKEN",incryptedAccessToken);
    localStorage.setItem("REFRESH_TOKEN",incryptedRefreshAccessToken);
    console.log("Both Token Successfully setted.");

  }



app.get("/login",  (req,res) => {

    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id : client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
});


app.get('/callback', (req, res) => {

    let code = req.query.code || null;
    let state = req.query.state || null;
  
    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {

        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
            },
            headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                let access_token = body.access_token;
                let  refresh_token = body.refresh_token || refresh_token;
                res.send(body)
                storeTolocalStorage(access_token,refresh_token);
            }
        });
      }
  });       

  app.get('/refresh_token', (req, res) => {

    let refresh_token = req.query.refresh_token;
    let authOptions = {

        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            let access_token = body.access_token,
            refresh_token = body.refresh_token || refresh_token;
            res.send({
                'access_token': access_token,
                'refresh_token': refresh_token
            });
        }
    });
  });