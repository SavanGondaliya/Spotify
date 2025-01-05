import express from "express";
import CryptoJs from "crypto-js";
import axios from "axios";
import { localStorage,accessToken } from "../../../config.js";

export const getTrackById = async(req,res) => {

    const { id } = req.params;

    if (!accessToken) {
      return res.status(401).send({ message: "Access token not found" });
    }
    
    try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,
        {
          headers:{
            "Content-Type" : "Application/json",  
            "Authorization": `Bearer ${accessToken}`
          },
        }
      )

      if(response.data){
        res.redirect(`/tracks/play?context_uri=${encodeURIComponent(response.data.uri)}`)
      }
    } catch (error) {
        res.status(500).send(error)
    }
  };

export const getSavedTracks = async(req,res) => {

  const MARKET = "IN";
  const LIMIT = 20;
  const OFFSET = 0;

  try{

    const response = await axios.get(`https://api.spotify.com/v1/me/tracks`,{
      params:{
        market:MARKET,
        limit:LIMIT,
        offset:OFFSET
      },
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${accessToken}`
      }
    });
    res.send(response.data);
  }
  catch(error){
    res.status(500).send(error.name);
  }
}

export const play = async(req,res) => {

  const {context_uri} = req.query;
  console.log(context_uri);
  console.log("Fuck you Got the Error.");
  

  if(!accessToken){
    res.status(401).send({message:"Access Token Not Found..."})
  }

  if(!context_uri){
    res.status(404).send({message:"No Context Uri Found..."})
  }

  try {
    const response = await axios.put(`https://api.spotify.com/v1/me/player/play`,{
      headers:{
        "content-type":"application/json",
        "authorization":  `Bearer ${accessToken}`
      },
      data:{
        "context_uri" : context_uri,
        "offset": {
          "position": 5
        },
        "position_ms": 0
      }
    })
    res.send(response.data);
  } catch (error) {
    res.status(500).send({message:"Not Found."});
  }
}