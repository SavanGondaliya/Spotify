"use strict"

import axios from "axios";
import { userToken } from "../Helpers/Auth.helper.js";

    export const userProfile = async(req,res) => {

        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails); 

        try {

            if(!authToken){
                return res.status(401).send("UnAuthorized User");
            }

            const response = await axios.get(`https://api.spotify.com/v1/me`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${authToken}`
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
                    "Authorization" : `Bearer ${accessToken.access_token}`
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