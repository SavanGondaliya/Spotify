import axios from "axios";
import { userToken } from "../Helpers/Auth.helper.js";
import conn from "../../../index.js";
import { json } from "express";

export const getArtistDetail = async(req,res) => {
    try {
        
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);
        const {id} = req.params;
                
        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }

        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`,{
            headers:{
                "Content-Type": "application",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        
        if(response.status === 200){
            return res.status(200).send(response.data);
        }
        return res.status(response.status).send(response.data);
    } catch (error) {
        console.log(error.response.headers);
        return res.status(500).send({message : error});
    }
}

export const getArtistAlbum = async(req, res) => {
    try {

        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);
        
        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }

        const response  = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`,{
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

export const getArtistTopTrack = async(req,res) => {
    try {
        
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);
        const {id} = req.params;
        console.log(userDetails,authToken,id);
        
        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }

        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization":  `Bearer ${authToken}`
            }
        });
        console.log(response.status);
        if(response.status === 200){
            return res.status(response.status).send(response.data);
        }
        return res.status(404).send({message : response.data.statusText});
    } catch (error) {   
        console.log(error);
        
        return res.status(500).send({message : error.message});
    }
}

export const getMultipleArtits = async(req, res) => {
    try {
        
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);

        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }

        const { ids } = req.params;

        const response = await axios.get(`https://api.spotify.com/v1/artists/${ids}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        });
        if(response.status === 404){
            return res.status(200).send(response.data);
        }
        return res.status(response.status).send({message : response.statusText});
    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const kpopArtist = async(req, res) => {
    try {
        
        const query = `SELECT * FROM tblartist WHERE genre LIKE '%k-pop%' ORDER BY popularity DESC LIMIT 10;`;

        conn.query(query, (err, results, fields) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(404).send({ success: false, message: err.message });
            }
            console.log(results);
            return res.status(200).send(results);
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ success: false, message: error.message });
    }
};

export const BollywoodArtist = async(req, res) => {
    try {
        console.log("called");
        
        const query = `select * from tblartist where popularity between 10 and 90 and genre='["bollywood","hindi pop","desi"]';`;

        console.log(query);

        conn.query(query, (err, results, fields) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(404).send({ success: false, message: err.message });
            }
            console.log(results);
            return res.status(200).send(results);
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ success: false, message: error.message });
    }
};

export const addAlbums = async(album) => {

    try {
        console.log(album);
        album.items.forEach(element => { 
            const query = `INSERT INTO tblalbum(album_id,album_name,image,total_tracks,artist_id) VALUES('${element.id}','${element.name}','${element.images[0].url}','${element.total_tracks}','${element.artists[0].id}');`;
            console.log(query);
            
            return new Promise((resolve,reject) => {

                conn.query(query,(err) => {
                    if(err){
                        return reject();
                    }
                    resolve();
                    console.log("inserted.");
                })
            }).catch((err) => {
                console.log(err);
            })              
        });

    } catch (error) {
        return error
    }
}

export const getLocalArtistDetails = async(req,res) => {
    try {
        console.log("called");

        const {id} = req.params;
        console.log(id);

        const query = `SELECT * FROM tblartist WHERE artist_id = ?;`;
        
        conn.query(query,[id],(err,results,fields) => {
            if(err){
                return res.status(500).send({success : false});
            }
            if(results.length == 0){
                return res.status(404).send({ success : false});
            }
            return res.status(200).send(results);
        })

    } catch (error) {
        return error;
    }
}