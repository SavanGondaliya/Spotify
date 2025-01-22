"use strict"

import axios from "axios";
import { accessToken,localStorage } from "../../../config.js";
import conn from "../../../index.js";

    export const userProfile = async(req,res) => {

        try {

            if(!accessToken){
                return res.status(401).send("UnAuthorized User");
            }

            const response = await axios.get(`https://api.spotify.com/v1/me`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
            if(response.status ===  200){
                return res.status(200).send(response.data);
            }
            return res.status(404).send({message : "No User Found"})
        } catch (error) {
            return res.status(500).send({message : error.message})
        }
    }

    export const userTopArtist = async(req, res) => {

        try {

            const range = "medium_range";
            const limit = 10;
            const offset = 0;

            const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?range=${range}&limit=${limit}&offset=${offset}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data);
            }
            return res.status(404).send({message : "No Data Found."});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const userTopTracks = async(req,res) => {
        try {
            const range = "medium_range";
            const limit = 10;
            const offset = 0;

            const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?range=${range}&limit=${limit}&offset=${offset}`,{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
            if(response.status  ===  200){
                return res.status(200).send(response.data);
            }
            return res.status(404).send({message : "No Data Found"});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getUserProfile = async(req, res) => {
        try {

            if(!accessToken){
                return res.status(401).send("Unauthorized Token.")
            }

            const user_id = req.params;
            console.log(user_id);
            
            const response = await axios.get(`https://api.spotify.com/v1/users/${user_id}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            console.log(response.status);
            
            if(response.status ===  200){
                return res.status(200).send(response.data);
            }
            return res.status(404).send({message : "No User Found."});
        } catch (error) {
            return res.status(500).send({message :  error.message});
        }
    }

    export const userArtist =  async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : "UnAuthorized User"});
            }
            const type = "artist";

            const limit = 10;
            const response = await axios.get(`https://api.spotify.com/v1/me/following?type=${type}&limit=${limit}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data);
            }

            return res.status(404).send({message : "No Artist Found"})
        } catch (error) {
            return res.status(500).send({message : error.message});      
        }
    } 

    export const followPlaylist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { playlistId } = req.params; 
            const isPublic = false
            console.log(playlistId);

            const response = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/followers`,{
                "public": isPublic
            },{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200  ){
                return res.status(200).send({message : "Follow Success  "});
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    
    export const unfollowPlaylist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { playlistId } = req.params; 

            const response = await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`,
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200  ){
                return res.status(200).send({message : "Unfollow Success"});
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const getFollowedArtist = async(req, res) => {
        try {
            const type = "artist"

            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const response = await axios.get(`https://api.spotify.com/v1/me/following`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status ===  200){
                return res.status(200).send(response.data)
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message:  error.message});
        }
    }

    export const followArtist = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const { artistId }= req.params;
            
            const response = await axios.put(`https://api.spotify.com/v1/me/following?type=artist`,
             {
                ids : [
                    artistId
                ]                
             },
             {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });

            if(response.status === 204){
                return res.status(200).send({message : "SuccessFully Follow Artist"})
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const followUser  = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { userId } = req.params;
            console.log(userId);
            
            const response = await axios.put(`https://api.spotify.com/v1/me/following?type=user`,
            {
                ids:[
                    userId
                ]
            },
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });

            if(response.status === 204){
                return res.status(200).send({message : "SuccessFully Follow User."});
            }

            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const unfollowArtist  = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { artistId } = req.params;
            console.log(artistId);
            
            const response = await axios.delete(`https://api.spotify.com/v1/me/following?type=artist`,
            {
                ids : [
                    artistId
                ]                
            },
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send({message : "SuccessFully Follow User."});
            }
            return res.status(404).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const unfollowUser  = async(req, res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const { userId } = req.params;
            const response = await axios.delete(`https://api.spotify.com/v1/me/following?type=user`,
            {
                ids : [
                    userId
                ]                
            },
            {
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send({message : "SuccessFully Follow User."});
            }
            return res.status(404).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }


    export const isUserFollowArtist = async(req,res) => {
        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }

            const {artistId } = req.params;
            const response = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data);
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    export const isUserFollowUser = async(req,res) => {
        try{
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const userId = req.params;

            const response = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=user&ids=${userId}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization"  : `Bearer ${accessToken}`
                }
            });
            if(response.status === 200){
                return res.status(200).send(response.data)
            }
            return res.status(response.status).send({message : response.statusText});
        }
        catch(error){
            return res.status(500).send({message:  error.message});
        }
    }

    export const isUserFollowsPlaylist = async(req, res) => {

        try {
            if(!accessToken){
                return res.status(401).send({message : res.statusText});
            }
            const playlistId = req.params;
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${accessToken}`
                }
            }); 
            if(response.status ===  200){
                return res.status(200).send(response.data);
            }
            return res.status(response.status).send({message : response.statusText});
        } catch (error) {
            return res.status(500).send({message :error.message});
        }

    }

    export const userLogin = async(req, res) => {
        try {
            const { username, password } = req.query;
            console.log(username, password);
            
            if (!username || !password) {
                return res.status(400).send({ message: "Username and password are required" });
            }
    
            const query = 'SELECT * FROM tbluser WHERE username = ? and password = ?';
    
            const rows = await conn.execute(query, [username, password]);
            
            if (rows)    {
                return res.status(200).send({ message: "Login successful", user: rows });
            } else {
                return res.status(401).send({ message: "Invalid username or password" });
            }
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    };
    
    export const userRegister = async(req, res) => {
        try {   
            const date  =new Date();
            
            const userDetail = {
                userId : 12236651,
                username : "Santosh Makavana",
                email : "santoshmakavana@gmail.com",
                password : "1992",
                created_at : date.toUTCString(),
                updated_at : date.toUTCString()
            };
            console.log(typeof(userDetail.userId),typeof(userDetail.username),typeof(userDetail.email),typeof(userDetail.password),typeof(userDetail.created_at),typeof(userDetail.updated_at));
            
            const row = await conn.execute(`insert into tbluser(user_id,username,email,password,created_at,updated_at) values(?,?,?,?,?,?)`,
                [userDetail.userId,userDetail.username,userDetail.email,userDetail.password,userDetail.created_at,userDetail.updated_at]);

            console.log(row);
            
            if(row){
                return res.status(200).send({message : "Register successfully."});
            }
            else{
                return res.status(400).send({message : "Fill All the Information"});
            }
        } catch (error) {
            return res.status(500).send({message : error.message});
        }
    }

    
