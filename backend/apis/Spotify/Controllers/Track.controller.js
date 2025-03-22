"use strict"

import axios from "axios";
import { userToken } from "../Helpers/Auth.helper.js";
import conn from "../../../index.js";
import { getArtistIds } from "../Helpers/Artist.helper.js";
import { getLikedSongs,setLikedTracks,removeTrack } from "../Helpers/Track.helper.js";


// global variables
  const Market  = "IN";

  export const getTrackById = async(req,res) => {
  
    try {
      console.log("called Tracks");
      
      const {id} = req.params;
      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);
      console.log(id,userDetails,authToken);
      
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
      
      const updatedTracks = await removeTrack(currentLikedIds,ids);
      
      const query = `UPDATE tbluser SET liked_songs ='${updatedTracks}' where user_id='${user_id}';`; 
      
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

      conn.query(query,(err,results) => {
        if(err){
          return res.status(404).send({success : "false"});
        }
        return res.status(200).send(results);
      });

    } catch (error) {
      return res.status(500).send({message:error.message});
    }
  }


  export const trendingSong = async(req, res) => {
    try {
      const query = `SELECT * FROM tblreport WHERE updated_at >= NOW() - INTERVAL 24 HOUR;`;
    
      conn.query(query, (err, results) => {
        if (err) {
          return res.status(400).send({ message: err });
        }
    
        if (results.length === 0) {
          return res.status(200).send({ message: "No reports for the last day" });
        }
    
        const resultLength = results.length;
        let mergedArray = { ...results[0]?.listened_songs };
    
        for (let i = 1; i < resultLength; i++) {
          for (const [songId, count] of Object.entries(results[i]?.listened_songs)) {
            mergedArray[songId] = (mergedArray[songId] || 0) + count;
          }
        }
    
        const sortedArray = Object.entries(mergedArray).sort((a, b) => b[1] - a[1]);
        return res.status(200).send(sortedArray[0]);
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }    
  }

  export const topHits = async(req, res) => {
    try {
      
      const query = `select listened_songs from tblreport`;
      
      conn.query(query,(err,results) => {
        if(err){
          return res.status(400).send({message:err})
        }
        const ressultLength = results.length;

        const mergedArray = {...results[0].listened_songs}
        
        for(let i=1;i<ressultLength;i++){
          for(const [songId,count] of Object.entries(results[i].listened_songs)){
            mergedArray[songId] = (mergedArray[songId] || 0) + count
          }
        }
        const sortedArray =  Object.entries(mergedArray).sort((a,b) => b[1] - a[1]);

        return res.status(200).send(sortedArray.splice(0,8));
      }); 
    
    } catch (error) { 
      return res.status(500).send({message:error.message});
    }
  }

  export const Songs = async(req, res) =>{
    try {
      
      const query = `select listened_songs from tblreport`;
      const session_details = req.query.session_details;

      conn.query(query,(err,results) => {
        if(err){
          return res.status(400).send({message:err})
        }
        const ressultLength = results.length;

        const mergedArray = {...results[0].listened_songs}
        
        for(let i=1;i<ressultLength;i++){
          for(const [songId,count] of Object.entries(results[i].listened_songs)){
            mergedArray[songId] = (mergedArray[songId] || 0) + count
          }
        }
        const sortedArray =  Object.entries(mergedArray).sort((a,b) => b[1] - a[1]);
        sortedArray.splice(0,Math.floor(sortedArray/2).length);

        const url = `http://localhost:5000/tracks?ids=${sortedArray.map((song_id) => song_id[0]).join(",")}&session_details=${session_details}`;
        console.log(url);
        
        axios.get(url,{
          headers:{
            "Content-Type":"application/json"
          }
        }).then((response) => {
          if(response.status === 200){
            return res.status(200).send(response.data)
          }
        }).catch((error) => {
          return res.status(500).send({message:error.message});
        })

      }); 
    
    } catch (error) { 
      return res.status(500).send({message:error.message});
    }
  }