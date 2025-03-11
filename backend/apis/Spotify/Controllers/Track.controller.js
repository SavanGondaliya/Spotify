"use strict"

import axios from "axios";
import { userToken } from "../Helpers/Auth.helper.js";
import conn from "../../../index.js";
import { getArtistIds } from "../Helpers/Artist.helper.js";
import { getLikedSongs,setLikedTracks,removeTrack } from "../Helpers/Track.helper.js";
import { login } from "./Auth.controller.js";


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
      
      const {ids} = req.query;
      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);
      
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
      
      if(response.status === 200){
        
        return res.status(200).send(response.data);
      }
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  export const getUserSavedTracks = async(req, res) => {
    try {
      console.log('called saved tracks');
      
      const {user_id} = JSON.parse(req.query.session_details);
      const currentLikedIds = await getLikedSongs(user_id);
      console.log(user_id,currentLikedIds);
      
      return res.status(200).send(currentLikedIds);

    } catch (error) {
      return res.status(500).send({message: error.message})
    }
  }

  export const saveCurrentTrack = async(req, res) => {
      try {
        console.log("called");
        
        const {user_id} = JSON.parse(req.query.session_details);
        const {ids} = req.params;
        console.log(user_id,ids);
        
        const currentLikedIds = await getLikedSongs(user_id);
        const LikedTracks = await setLikedTracks(currentLikedIds,ids);
        
        const query = `UPDATE tbluser SET liked_songs ='${LikedTracks}' where user_id='${user_id}';`; 
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

  
  export const deleteCurrentTrack = async(req, res) => {

    try {
      
      const {user_id} = JSON.parse(req.query.session_details);
      const {ids} = req.params;
      const currentLikedIds = await getLikedSongs(user_id);
      console.log(currentLikedIds);
      
      const updatedTracks = await removeTrack(currentLikedIds,ids);
      console.log(updatedTracks);
      
      const query = `UPDATE tbluser SET liked_songs ='${updatedTracks}' where user_id='${user_id}';`; 
      console.log(query);
      
      conn.query(query,(err) => {
        if(err){
          return res.status(400).send({message:err})
        }
        return res.status(200).send({message:`deleted {ids}`})
      })

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
        
      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);
      
      const ids = await getArtistIds("song_id");
      
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

  
  export const getLocalTracks = async(req,res) => {
    try {

      const query = `select song_id from tblsongs`;

      conn.query(query,(err,results,fields)=>{
        if(err){
          return res.status(404).send({success : "false"});
        }
        return res.status(200).send(results);
      })

    } catch (error) {
      return res.status(500).send({message:error.message});
    }
  }