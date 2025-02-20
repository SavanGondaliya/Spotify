import axios from "axios";
import userToken from "../Helpers/Auth.helper.js"
import { login } from "./Auth.controller.js";

const market = "IN";

export const getAlbumUri = async(req,authToken) => {
  
  const {id} = req.params;
  if (!authToken) {
    return "Access Not Found...";
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,
      {
        headers:{
          "Content-Type" : "Application/json",  
            "Authorization": `Bearer ${authToken}`
          },
        }
      );
      if(response.status === 200){  
        const contextUri  = response.data.album.uri;
        
        if(!contextUri){
          return "No Context uri Found"
        }
        return contextUri;
      }
    } catch (error) {
      return error.message;
    }
  };

  export const getArtistUri = async(req,authToken) => {
  
    const { id } = req.params;
    
    if (!authToken) {
      return "Access Not Found...";
    }
  
    try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,
        {
          headers:{
            "Content-Type" : "Application/json",  
              "Authorization": `Bearer ${authToken}`
            },
          }
        );
        if(response.status === 200){  
          const contextUri  = response.data.artist.uri;
          
          if(!contextUri){
            return "No Context uri Found"
          }
          return contextUri;
        }
      } catch (error) {
        return error.message;
      }
    };


    export const getTrackUri = async(req,authToken) => {
  
      const { id } = req.params;
      
      if (!authToken) {
        return "Access Not Found...";
      }
    
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,
          {
            headers:{
              "Content-Type" : "Application/json",  
                "Authorization": `Bearer ${authToken}`
              },
            }
          );
          if(response.status === 200){  
            const contextUri  = response.data.uri;
      
            if(!contextUri){
              return "No Context uri Found"
            }
            return decodeURIComponent(contextUri);
          }
        } catch (error) {
          return error.message;
        }
      };
        
  export const playTrack = async (req, res) => {
      
      try {
        
        const userDetails = JSON.parse(req.query.session_details);
        const deviceId =  req.query.deviceId;
        const authToken = await userToken(userDetails); 
        const contextUri =  await getTrackUri(req,authToken);
        console.log(userDetails,deviceId,authToken,contextUri);
        
        if (!authToken) {
          return res.status(401).send({ message: "Access Token Not Found..." });
        }
        
        if (!contextUri) {
          return res.status(404).send({ message: "No Context Uri Found..." });
        }
        
        const response = await axios.put(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            uris : [contextUri]
          },
          {
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
          }
        );
      
      if(response.status === 200 | 204){
        return res.status(200).send({ message: "Playback started successfully" });
        
      }
      return res.status(404).send({message: "No Song Found"});
    } catch (error) {
      if (error.response) {
        return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  };

  
  export const playAlbum = async (req, res) => {
      
    try {
      
      const userDetails = JSON.parse(req.query.session_details);
      const deviceId =  req.query.deviceId;
      const authToken = await userToken(userDetails); 
      const contextUri =  await getAlbumUri(req,authToken);
      
      if (!authToken) {
        return res.status(401).send({ message: "Access Token Not Found..." });
      }
      
      if (!contextUri) {
        return res.status(404).send({ message: "No Context Uri Found..." });
      }
      
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          contextUri:contextUri
        },
        {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
        }
      );
    
    if(response.status === 200 | 204){
      return res.status(200).send({ message: "Playback started successfully" });
      
    }
    return res.status(404).send({message: "No Song Found"});
    } catch (error) {
      if (error.response) {
        return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  };

  export const playBackState = async(req,res) => {
    
    try {

      const userDetails = JSON.parse(req.query.session_details);
      const deviceId =  req.query.deviceId;
      const authToken = await userToken(userDetails); 
  
      if(!authToken){
        return res.status(401).json({"authorized":false});
      }

      const response = await axios.get(`https://api.spotify.com/v1/me/player?market=${market}&device_id=${deviceId}`,{
        headers:{
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      if(response.status ===  200){
        return res.status(200).send(response.data);
      }
      return res.status(404).send({message: "All Device Off now"})
    } catch (error) {
      console.error(error.message)
      if (error.response) {
        const errorMessage =
        error.response.data?.error?.message || "Error from Spotify API";
        return res.status(error.response.status).send({ message: errorMessage });
      }
      return res.status(500).send({message:error.message});
    }
  }

  export const pause = async(req,res) => {

    try {
      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);
      const contextUri = await getAlbumUri(req,authToken);

      if(!authToken){
        return res.status(401).send({message : "UnAuthorized User."});
      }

      const response = await axios.put(`https://api.spotify.com/v1/me/player/pause/?device_id=${deviceId}`,
        {
          context_uri : contextUri,
          position_ms : 0,
        },{
          headers:{
            "Content-Type" : "appliaction/json",
            "Authorization" : `Bearer ${authToken}`
          }
      });
      
      if(response.status === 200){
        return res.status(200).send({message : "Music Stopped."});
      }
      return res.status(404).send({message:"No active Device"})
    } catch (error) {
      return res.status(500).send({message:error.message});
    }
  }

  export const setRepeatMode = async(req,res) => {

    try {
      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);
      const deviceId = req.query.deviceId
      const repeatState = req.query.state;
      let contextUri = null;

      if(repeatState == "track"){
        contextUri = await getTrackUri(req,authToken);
      }
      else if(repeatState == "context"){
        contextUri = await getAlbumUri(req,authToken);
      }
      else{
        contextUri = "off"
      }

      if(!authToken){
        return res.status(401).send({message : "UnAuthorized User",user: false});
      }

      const response = await axios.put(`https://api.spotify.com/v1/me/player/repeat?state=${repeatState}&device-id=${deviceId}`,{
        context_uri : contextUri
      },
        {
          headers:{
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${authToken}`
          }
        });
        if(response.status === 200){
          return res.status(200).send({message:"Repeat Mode On"})
        }
        return res.status(404).send({message: "Not Found"})
    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }

  export const PlayingSong = async(req,res) => {

    try { 
      console.log("called");
      
      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);
  
      if(!authToken){
        return res.status(401).send({message : "UnAuthorized User"})
      }
      
      const response = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing?market=${market}&device_id=${deviceId}`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      if(response.status === 204|200){
        console.log(response.data);
        return res.status(200).send(response.data)
      } 
      return res.status(response.status).send({message: response.statusText});
    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }

  export const recentlyPlayedSongs = async(req, res) => {
    try { 
      
      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);
      const before = new Date() - 36000;
      const limit = 10; 
      
      if(!authToken){
        return res.status(401).send({message: "UnAutorized Uaer"});
      }

      const response = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?device_id=${deviceId}&before=${before}&limit=${limit}`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });

      if(response.status === 200){
        return res.status(200).send(response.data);
      }
      return res.status(404).send({message : "Not Found Any Current Report"});
    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  } 

  export const setTrackQueue = async(req,res) => {
    try {

      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);

      if(!authToken){
        return res.status(401).send({message : "UnAuthorized Error"});
      }
      
      const trackUri  = await getTrackUri(req,userDetails);
            
      const response = await axios.post(`https://api.spotify.com/v1/me/player/queue?uri=${trackUri}&device_id=${deviceId}`,
       {},
       {
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      
      if(response.status === 404 ){
        return res.status(404).send({message : "Unable to Add Item in queue"})
      }
      return res.status(response.status).send({message : response.statusText});
    } catch (error) {
      
      return res.status(500).send({message : error.message});
    }
  }

  export const getTrackQueue = async(req, res) => {
    try {

      const userDetails = JSON.parse(req.query.session_details);
      const authToken = await userToken(userDetails);


      if(!authToken){
        return res.status(401).send({message : "UnAuthorized User"});
      }

      const response = await axios.get(`https://api.spotify.com/v1/me/player/queue`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      if(response.status === 200 || 204){
        return res.status(200).send(response.data);
      }
      return res.status(404).send({message : "Unable to get The Queue"})
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  export const skipToNext = async(req, res) => {
    try {

      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);

      if(!authToken){
        return res.status(401).send({message : res.statusText});
      }
      const response = await axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`,
      {},
      {
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      if(response.status === 404){
        return res.status(404).send({message : res.statusText});
      }
      return res.status(response.status).send({message : response.statusText});
    } catch (error  ) {
        return res.status(500).send({message : error.message});
    }
  }

  export const skipToPrevious = async(req, res) => {
    try {
      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);

      if(!authToken){
        return res.status(401).send({message : res.statusText});
      } 
      
      const response = await axios.post(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
      {},
      {
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      if(response.status === 404){
        return res.status(404).send({message : res.statusText});
      }
      return res.status(response.status).send({message : response.statusText});
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }

  export const setVolume = async(req, res) => {
    try {

      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);
      const volume = req.query.volume;

      if(!authToken){
        return res.status(401).send({message : res.statusText});
      }

      const response = await axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}&deviceId=${deviceId}`,{},{
        headers:{
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      
      if(response.status === 404){
        return res.status(404).send({message : "Unable To Set Volume"});
      }
      return res.status(response.status).send(response.statusText);
    } catch (error) {
      return res.status(500).send({message : res.statusText});
    }
  }

  export const seekTrack = async(req,res) => {
    try {

      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);
      const position_ms = req.query.position_ms;

      if(!authToken){
        return res.status(401).send({message : res.statusText });
      }
    
      const response = await axios.put(`https://api.spotify.com/v1/me/player/seek?position_ms=${position_ms}&device_id=${deviceId}`,{},{
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${authToken}`
        }
      });
      
      if(response.status === 404){
        return res.status(404).send({message : response.statusText});
      }
      return res.status(response.status).send({message: response.statusText});
    } catch (error) {
      return res.status(500).send({message : res.statusText});
    }
  }
  
  export const playBackShuffle = async(req, res) => {
    try {

      const userDetails = JSON.parse(req.query.session_details);
      const deviceId = req.query.deviceId;
      const authToken = await userToken(userDetails);
      const state = req.query.state;

      if(!authToken){
        return res.status(500).send({message : res.statusText});
      }
    
      const response = await axios.put(`https://api.spotify.com/v1/me/player/shuffle?state=${state}&device_id=${deviceId}`,
      {},
      {
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      
      if(response.status === 404){
        return res.status(404).send({message : res.statusText});
      }
      return res.status(response.status).send({message : response.statusText});
    } catch (error) {
      return res.status(500).send({message : error.message});
    }
  }