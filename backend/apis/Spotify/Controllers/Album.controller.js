import axios from "axios";
import { activeDeviceId } from "./Device.controller.js";
import { userToken } from "../Helpers/Auth.helper.js";
import conn from "../../../index.js";
import { getArtistIds } from "../Helpers/Artist.helper.js";

const Market = "In";

export const getAlbum = async(req,res) => {
    try {   
        
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);
        
        if(!authToken){
            return res.status(401).send({Message : res.statusText});
        }
        
        const { id } = req.params;
        
        const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`,{
            headers:{
                "Content-Type" : "application",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        
        if(response.status === 200){
            return res.status(200).send(response.data);
        }
        
        return res.status(response.status).send({message: res.statusText});
    } catch (error) {
        return res.status(500).send({Message : error.Message});
    }
}

export const getMultipleAlbums = async(req, res) => {

    
    const userDetails = JSON.parse(req.query.session_details);
    const authToken = await userToken(userDetails);

    try {
        if(!authToken){
            return res.status(401).send({Message : res.statusText});
        }
        const {ids} = req.params;

        const response = await axios.get(`https://api.spotify.com/v1/albums/${ids}?market=${Market}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.status === 404){
            return res.status(404).send({message : response.statusText});
        }
        return res.status(response.status).send(response.data);
    } catch (error) {   
        return res.status(500).send({Message : error.Message });
    }
}

export const getAlbumTracks = async(req, res) => {
    try {
        
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);

        const {id} = req.params;

        const response = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        
        if(response.status === 200){
            return res.status(200).send(response.data);
        }   
        return res.status(404).send({message : response.statusText});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

// export const userSavedAlbums = async(req, res) => {
//     try {
        
//         const userDetails = JSON.parse(req.query.session_details);
//         const authToken = await userToken(userDetails);
           
//         if(!authToken){
//             return res.status(401).send({message : res.statusText});
//         }
        
//         const  response = await axios.get(`https://api.spotify.com/v1/me/albums`,{
//             headers:{
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${authToken}`
//             }
//         });
//         if(response.status === 404){
//             return res.status(404).send({message : response.statusText});
//         }
//         return res.status(response.status).send(response.data);
//     } catch (error) {
//         return res.status(500).send({message : error.message});
//     }
// }

// export const saveCurrentAlbum = async(req, res) => {
//     try {
        
//         const userDetails = JSON.parse(req.query.session_details);
//         const authToken = await userToken(userDetails);

//         if(!authToken){
//             return res.status(401).send({message : res.statusText});
//         }
//         const {id} = req.params;
//         const deviceId = await activeDeviceId(req, res);
        
//         const response = await axios.put(`https://api.spotify.com/v1/me/albums?ids=${id}&device_id=${deviceId}`,{
//             headers:{
//                 "Content-Type" : "application/json",
//                 "Authorization" : `Bearer ${authToken}`        
//             }
//         });
//         if(response.status === 404){
//             return res.status(404).send({message : response.statusText });
//         }
//         return res.status(response.status).send({message : "Album Saved To User Library"});
//     } catch (error) {
//         return res.status(500).send({message : error.message});
//     }
// }

// export const deleteCurrentAlbum = async(req, res) => {
//     try {
        
//         const userDetails = JSON.parse(req.query.session_details);
//         const authToken = await userToken(userDetails);

//         if(!authToken){
//             return res.status(401).send({message : res.statusText});
//         }
//         const {id} = req.params;
//         const deviceId = await activeDeviceId(req, res);
        
//         const response = await axios.delete(`https://api.spotify.com/v1/me/albums?ids=${id}&device_id=${deviceId}`,
//         {
//             headers:{
//                 "Content-Type" : "application/json",
//                 "Authorization" : `Bearer ${authToken}`        
//             }
//         });
//         if(response.status === 404){
//             return res.status(404).send({message : response.statusText });
//         }
//         return res.status(response.status).send({message : "Album Deleted from User Library"});
//     } catch (error) {
//         return res.status(500).send({message : error.message});
//     }
// }

// export const checkAlbumForUser = async(req, res) => {
//     try {

//         const userDetails = req.query.session_details;
//         const authToken = await userToken(userDetails);

//         if(!authToken){
//             return res.status(401).send({message : res.statusText});
//         }
//         const {id} = req.params;
//         const deviceId = await activeDeviceId(req,res);

//         const response = await axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${id}&device_id=${deviceId}`,
//         {
//             headers:{
//                 "Content-Type" : "application/json",
//                 "Authorization" : `Bearer ${authToken}`        
//             }
//         });
        
//         if(response.status === 404){
//             return res.status(404).send({message : response.statusText });
//         }
//         return res.status(response.status).send(response.data);
//     } catch (error) {
//         return res.status(500).send({message : error.message});
//     }
// }

// export const newRelease = async(req, res) => {
//     try {
        
//         const userDetails = JSON.parse(req.query.session_details);
//         const authToken = await userToken(userDetails);
        
//         if(!authToken){
//             return res.status(401).send({message : res.statusText});
//         }
//         const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases`,{
//             headers:{
//                 "Content-Type" : "application/json",
//                 "Authorization" : `Bearer ${authToken}`
//             }
//         });
        
//         if(response.status === 200){
//             return res.status(200).send(response.data); 
//         }
//         return res.status(res.status).send({message : response.statusText});
//     } catch (error) {
//         return res.status(500).send({message : error.message});
//     }
// }

// export const AddTracks = (album,album_id) => {
//     try {
//         album.items.forEach(elements => {
//             const query = `INSERT INTO tblsongs(song_id,title,track_number,duration,song_url,artist_id,album_id) VALUES('${elements.id}','${elements.name}','${elements.track_number}','${elements.duration_ms}','${elements.uri}','${elements.artists[0].id}','${album_id}')`
            
//             return new Promise((resolve,reject) => {

//                 conn.query(query,(err) => {
//                     if(err){
//                         return reject();
//                     }
//                     resolve();
//                     })
//                 }).catch((err) => {
//                     console.log(err);
//                 })    
//         });
//     } catch (error) {
//         return error;
//     }
// }

export const populerAlbums = async(req,res) => {
    try {
      
        const userDetails = req.query.session_details;
        const authToken = await userToken(userDetails);
        const ids = await getArtistIds("album_id");
        let topTrackIds = []
        let index = 0;
        
        for(let i=0;i<10;i++){
          index = Math.floor(Math.random()*10);
          topTrackIds.push(ids[index].album_id)
        }
  
        const response = await axios.get(`https://api.spotify.com/v1/albums?ids=${topTrackIds.join(",")}`,{
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