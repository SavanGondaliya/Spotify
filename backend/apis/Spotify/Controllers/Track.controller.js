"use strict"

import axios from "axios";
import { userToken } from "../Helpers/Auth.helper.js";
import conn from "../../../index.js";
import { getArtistIds } from "../Helpers/Artist.helper.js";
import { getLocalArtistDetails } from "./Artist.controller.js";
import { getCurrentTracks } from "../Helpers/Playlist.helper.js";
import { getLikedSongs,setLikedTracks } from "../Helpers/Track.helper.js";

// global variables
  const Market  = "IN";

  export const getTrackById = async(req,res) => {
  
    try {
      const {id} = req.params;
      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);
      
      if(!authToken){
        return res.status(401).send({message : res.statusText});
      }
      
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,{
        params:{
          market : Market
        },
        headers:{
          "Content-Type" :"application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      if(response.status === 200){
        return res.status(200).send(response.data);
      }
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  export const getSeveralTracks = async(req,res) => {
    try {
      console.log('called');
      
      const {ids} = req.query;
      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);
      console.log(ids,authToken);
      
      if(!authToken){
        return res.status(401).send({message : res.statusText});
      }

      const url = `https://api.spotify.com/v1/tracks?ids=${ids}`;
      
      const response = await axios.get(url,{
        headers:{
          "Content-Type" :"application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      console.log(response.status);
      
      if(response.status === 200){
        console.log(response.data);
        
        return res.status(200).send(response.data);
      }
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  export const getUserSavedTracks = async(req, res) => {
    try {

      
      const userDetails = JSON.parse(req.query.session_details)[0];
      const authToken = await userToken(userDetails);

      if(!authToken){
        return res.status(401).send({message : res.statusText});
      }
      const limit = 10
      const offset = 0

      const response = await axios.get(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      if(response.status === 200){
        return res.status(200).send(response.data)
      }
      return res.status(response.status).send({message : response.statusText});
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  export const saveCurrentTrack = async(req, res) => {
    try {

      const userDetails = JSON.parse(req.query.session_details)[0];
      const authToken = await userToken(userDetails);

      if(!authToken){
        return res.status(401).send({message : res.statusText})
      }
      const {ids} = req.params;
      console.log(ids);
      
      const response = await axios.put(`https://api.spotify.com/v1/me/tracks?ids=${ids}`,
      {
        "ids":[
          ids
        ]
      },
      {
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      if(response.status === 200){
        return res.status(200).send({message : "Track Saved Successfully."});
      }
      return res.status(response.status).send({message : response.statusText});
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  
  export const deleteCurrentTrack = async(req, res) => {
    try {
      
      const userDetails = JSON.parse(req.query.session_details)[0];
      const authToken = await userToken(userDetails);

      if(!authToken){
        return res.status(401).send({message : res.statusText})
      }
    
      const response = await axios({
          method: "delete",
          url: `https://api.spotify.com/v1/me/tracks?ids=${ids}`,
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`,
          },
          data: {
              "ids": [
                  ids
              ],
          },
      });
      if(response.status === 200){  
        return res.status(200).send({message : "Track Deleted Successfully."});
      }
      return res.status(response.status).send({message : response.statusText});
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  export const isUserContainTrack = async(req, res) => {
    try {

        const userDetails = JSON.parse(req.query.session_details)[0];
        const authToken = await userToken(userDetails);

        if(!authToken){
          return res.status(401).send({message : res.statusText});
        }
        const {ids}  = req.params;    

        const response = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,{
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${authToken}`
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

  export const populerTracks = async(req,res) => {
    try {
        console.log('called...');
        
      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);
      console.log(authToken);
      
      const ids = await getArtistIds("song_id");
      console.log(ids);
      
      let topTrackIds = []
      let index = 0;
      
      for(let i=0;i<10;i++){
        index = Math.floor(Math.random()*10);
        topTrackIds.push(ids[index].song_id)
      }

      const response = await axios.get(`https://api.spotify.com/v1/tracks?ids=${topTrackIds.join(",")}`,{
        headers:{
          "Content-Type":"Application/json",
          "Authorization":`Bearer ${authToken}`
        }
      });
      if(response.status === 200){
        return res.status(200).send(response.data)
      }
      return res.status(400).send({message:response,statusText});
    } catch (error) {
      return res.status(500).send({message : error})
    }
  }

  export const likeSong = async(req,res) => {
    try {

      const {user_id} = JSON.parse(req.query.session_details);
      const {id} = req.params;
      const currentLikedIds = await getLikedSongs(id);
      const LikedTracks = await setLikedTracks(currentLikedIds,user_id);
      
      const query = `UPDATE tblsongs SET liked_by ='${LikedTracks}' where song_id='${id}';`; 
      console.log(query);
      
      conn.query(query,(err) => {
        if(err){
          return res.status(400).send({message:err})
        }
        return res.status(200).send({message:`Liked by ${user_id}`})
      })

    } catch (error) {
      return res.status(500).send({message: error.message})
    }
  }