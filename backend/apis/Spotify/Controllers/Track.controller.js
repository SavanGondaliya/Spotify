"use strict"

import axios from "axios";
import { localStorage,accessToken } from "../../../config.js";
import { activeDeviceId } from "./Device.controller.js";

// global variables
  const Market  = "IN";

  export const getTrackById = async(req,res) => {
    
    const {id} = req.params;
    
    try {
      
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,{
        params:{
          market : Market
        },
        headers:{
          "Accept" :"application/json",
          "Authorization" : `Bearer ${accessToken}`
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
      if(!accessToken){
        return res.status(401).send({message : res.statusText});
      }
      const limit = 10
      const offset = 0

      const response = await axios.get(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
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
      if(!accessToken){
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
          "Authorization" : `Bearer ${accessToken}`
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
      if(!accessToken){
        return res.status(401).send({message : res.statusText})
      }
      const {ids} = req.params;
      console.log(ids);
      
      const response = await axios({
          method: "delete",
          url: `https://api.spotify.com/v1/me/tracks?ids=${ids}`,
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
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
        if(!accessToken){
          return res.status(401).send({message : res.statusText});
        }
        const {ids}  = req.params;    

        const response = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,{
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${accessToken}`
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

