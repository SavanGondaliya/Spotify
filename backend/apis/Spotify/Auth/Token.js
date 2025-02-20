"use strict"
//  import Necessary Node Packages

import request from "request";
import express from "express";
import CryptoJS from "crypto-js";
import { configDotenv } from "dotenv";

// .env File configuration
configDotenv();

// Auth Router 
export const AuthRoutes = express.Router();

// secret keys
const client_id = `${process.env.CLIENT_ID}`;
const redirect_uri = `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/callback`;
const client_secret = `${process.env.CLIENT_SECRET}`;

export const callback  =  async(req, res) => {
    console.log("Function has been came here !");
    
    // let code = req.query.code || null;
    // let state = req.query.state || null;
  
    // if (state === null) {
    //     res.redirect('/#' +
    //         querystring.stringify({
    //         error: 'state_mismatch'
    //     }));
    // } else {

    //     let authOptions = {
    //         url: 'https://accounts.spotify.com/api/token',
    //         form: {
    //             code: code, 
    //             redirect_uri: redirect_uri,
    //             grant_type: 'authorization_code'
    //         },
    //         headers: {
    //             'content-type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    //         },
    //         json: true
    //     };

        request.post(authOptions, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                return res.json(body);
            }
        });
        // const token = req.query.token;

    // Send the token back to the frontend or another system
        // res.json({ success: true, token });
    }

  export const refreshToken = async(req,res) => {   

        let authOptions = {
    
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: CryptoJS.AES.decrypt(localStorage.getItem("REFRESH_TOKEN"),"REFRESH_TOKEN").toString("utf-8")
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
                storeTolocalStorage(access_token,refresh_token);
            }
        });
    };      

export default AuthRoutes;