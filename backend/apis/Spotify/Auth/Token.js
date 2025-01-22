"use strict"
//  import Necessary Node Packages

import request from "request";
import express from "express";
import querystring from "querystring"
import CryptoJS from "crypto-js";
import { configDotenv } from "dotenv";
import { generateRandomString,storeTolocalStorage,getScope } from "../Helpers/Auth.helper.js";

// .env File configuration
configDotenv();

// Auth Router 
export const AuthRoutes = express.Router();

// secret keys
const client_id = `${process.env.CLIENT_ID}`;
const redirect_uri = `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/callback`;
const client_secret = `${process.env.CLIENT_SECRET}`;


const login = async(req,res) => {

    let state = generateRandomString(16);
    let scope = getScope();

    await res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id : client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        })
    );
};

const callback  =  async(req, res) => {

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

        await request.post(authOptions, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                let access_token = body.access_token;
                let  refresh_token = body.refresh_token || refresh_token;

                res.send(body)
                storeTolocalStorage(access_token,refresh_token);
            }
        });
      }
  };       

  const refreshToken = async(req,res) => {   

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

AuthRoutes.get("/login",login);
AuthRoutes.get("/callback",callback);
AuthRoutes.get("/refresh",refreshToken);

export default (AuthRoutes);