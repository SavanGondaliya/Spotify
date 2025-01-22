import axios from "axios";
import { localStorage,accessToken } from "../../../config.js";
import { activeDeviceId } from "./Device.controller.js";
console.log(accessToken);

const market = "IN";

export const getAlbumUri = async(req) => {
  
  const { id } = req.params;
  
  if (!accessToken) {
    return "Access Not Found...";
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,
      {
        headers:{
          "Content-Type" : "Application/json",  
            "Authorization": `Bearer ${accessToken}`
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

  export const getArtistUri = async(req) => {
  
    const { id } = req.params;
    
    if (!accessToken) {
      return "Access Not Found...";
    }
  
    try {
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,
        {
          headers:{
            "Content-Type" : "Application/json",  
              "Authorization": `Bearer ${accessToken}`
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


    export const getTrackUri = async(req,res) => {
  
      const { id } = req.params;
      
      if (!accessToken) {
        return "Access Not Found...";
      }
    
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`,
          {
            headers:{
              "Content-Type" : "Application/json",  
                "Authorization": `Bearer ${accessToken}`
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
      
export const play = async (req, res) => {
    
    try {

      const deviceId = await activeDeviceId(req,res);
      const contextUri =  await getAlbumUri(req);
      
      if (!accessToken) {
        return res.status(401).send({ message: "Access Token Not Found..." });
      }
      
      if (!contextUri) {
        return res.status(404).send({ message: "No Context Uri Found..." });
      }
      
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          context_uri : contextUri,
          position_ms: 0
        },
        {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
        }
      );
      console.log(response.status);
      
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

      const deviceId = await activeDeviceId(req,res);

      const response = await axios.get(`https://api.spotify.com/v1/me/player?market=${market}&device_id=${deviceId}`,{
        headers:{
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${accessToken}`
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
      const deviceId = await activeDeviceId(req,res);
      const contextUri = await getAlbumUri(req);
      
      const response = await axios.put(`https://api.spotify.com/v1/me/player/pause/?device_id=${deviceId}`,
        {
          context_uri : contextUri,
          position_ms : 0,
        },{
          headers:{
            "Content-Type" : "appliaction/json",
            "Authorization" : `Bearer ${accessToken}`
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
      const deviceId = await activeDeviceId(req,res);
      const contextUri = await getAlbumUri(req);
      const repeatState = "track";
      
      const response = await axios.put(`https://api.spotify.com/v1/me/player/repeat?state=${repeatState}&device-id=${deviceId}`,{
        context_uri : contextUri
      },
        {
          headers:{
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${accessToken}`
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

      if(!accessToken){
        return res.status(401).send({message : "UnAuthorized User"})
      }

      const deviceId = await activeDeviceId(req,res);
      
      const response = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing?market=${market}&device_id=${deviceId}`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      })
      if(response.status === 200){
        return res.status(200).send(response.data)
      } 
      return res.status(response.status).send({message: response.statusText});
    } catch (error) {
      return res.status(500).send({message: error.message});
    }
  }

  export const recentlyPlayedSongs = async(req, res) => {
    try { 

      if(!accessToken){
        return res.status(401).send({message: "UnAutorized Uaer"});
      }

      const deviceId = await activeDeviceId(req,res);
      const limit = 10; 
      const before = 1737015782331

      const response = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?device_id=${deviceId}&limit=${limit}&before=${before}`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
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
        
      if(!accessToken){
        return res.status(401).send({message : "UnAuthorized Error"});
      }
      
      const deviceId = await activeDeviceId(req,res);
      const trackUri  = await getTrackUri(req,res);
            
      const response = await axios.post(`https://api.spotify.com/v1/me/player/queue?uri=${trackUri}&device_id=${deviceId}`,
       {},
       {
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
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

      if(!accessToken){
        return res.status(401).send({message : "UnAuthorized User"});
      }

      const response = await axios.get(`https://api.spotify.com/v1/me/player/queue`,{
        headers:{
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${accessToken}`
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
      if(!accessToken){
        return res.status(401).send({message : res.statusText});
      }
      const deviceId = await activeDeviceId(req, res);
      const response = await axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`,
      {},
      {
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
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
      if(!accessToken){
        return res.status(401).send({message : res.statusText});
      } 
      const deviceId = await activeDeviceId(req,res);
      const response = await axios.post(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
      {},
      {
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
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
      console.log("function Invoked");
      
      if(!accessToken){
        return res.status(401).send({message : res.statusText});
      }
      const volume = 90;
      const deviceId = await activeDeviceId(req, res);

      const response = await axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}&deviceId=${deviceId}`,{},{
        headers:{
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      console.log(response.status);
      
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
      if(!accessToken){
        return res.status(401).send({message : res.statusText });
      }
      console.log('Function Invoked !');
      
      const deviceId = await  activeDeviceId(req,res);
      const position_ms = 108000;

      const response = await axios.put(`https://api.spotify.com/v1/me/player/seek?position_ms=${position_ms}&device_id=${deviceId}`,{},{
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
        }
      });
      console.log(response.status);
      
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

      if(!accessToken){
        return res.status(500).send({message : res.statusText});
      }
      
      const deviceId = await activeDeviceId(req, res);
      const state = false;
      
      const response = await axios.put(`https://api.spotify.com/v1/me/player/shuffle?state=${state}&device_id=${deviceId}`,
      {},
      {
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
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