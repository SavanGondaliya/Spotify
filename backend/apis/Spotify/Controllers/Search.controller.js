import axios from "axios";
import { userToken } from "../Helpers/Auth.helper.js";
import conn from "../../../index.js";

export const search = async(req,res) => {
    
    const userDetails = JSON.parse(req.query.session_details);
    const authToken = await userToken(userDetails);
    
    if(!authToken || authToken == ""){
        return res.status(401).send({message : "UnAuthorized User"})
    }   
    
    const q = req.query.q;
    const type = "track,album,artist";
    const market = "IN";
    const limit = 10;
    const offset = 0;
    const include_external = "audio"
    
    const params = new URLSearchParams({
        q,type,market,limit,offset,include_external
    }).toString();
    
    
    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?${params}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        }
    )
    
        
    if(response.status == 200){
        return res.status(200).send(response.data)
    }
    return res.status(400).send({message : "Item Not Found"})
} catch (error) {
    return res.status(500).status({message: error.message})
}
}

export const getHindiAlbums = async(req, res) => {
    try {
        
        const userDetails = JSON.parse(req.query.session_details)[0];
        const authToken = await userToken(userDetails);
        
        if(!authToken || authToken == ""){
            return res.status(401).send({message : "UnAuthorized User"})
        }   
        
        const q = "arjit Singh";
        const type = "album";
        const market = "IN";
        const limit = 7;
        const offset = 0;
        const include_external = "audio"
        
        const params = new URLSearchParams({
            q,type,market,limit,offset,include_external
        }).toString();
        
        
        const response = await axios.get(`https://api.spotify.com/v1/search?${params}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        }
    )
    if(response.status===200){
        return res.status(200).send(response.data)
    }   
    return res.status(response.status).send(response.statusText);
} catch (error) {
    return res.status(500).send({message:error.message})
}
}

export const getSongs = async(req,res) => {
    
    try {
        
        const userDetails = {"user_id":"4r54fcllruao9y4y"}
        // const userDetails = JSON.parse(req.query.session_details)[0];
        const authToken = await userToken(userDetails);
    
        if(!authToken || authToken == ""){
            return res.status(401).send({message : "UnAuthorized User"})
        }   
    
        const q = req.query.name;
        const type = "track";
        const market = "IN";
        const limit = 20;
        const offset = 0;
        const include_external = "audio"

        const params = new URLSearchParams({
            q,type,market,limit,offset,include_external
        }).toString();
        
    
        const response = await axios.get(`https://api.spotify.com/v1/search?${params}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }
        }
    )
    
    if(response.status === 200){
        
        return res.status(200).send(response.data)
    }   
    return res.status(response.status).send(response.statusText);
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}


export const addArtist = async(id) => {

    try {
        const artist = getArtistDetail(id);

        artist.artists.items.forEach((element) => {
            let genre = JSON.stringify(element.genres);
            const query = `INSERT INTO tblartist(artist_id,artist_name,genre,image,bio,popularity) VALUES('${element.id}','${element.name}','${genre}','${element.images[0].url}','${element.type}','${element.popularity}')`; 
            
            
            return new Promise((resolve,reject) => {

                conn.query(query,(err) => {
                    if(err){
                        reject()
                    }
                    resolve()
                    
                })
            }).catch((err) => {
                
            })
        });
    } catch (error) {
        return error
    }
}

export const getAlbumId = async(req, res) => {
    try {

        const query = `SELECT album_id FROM tblalbum`;

        conn.query(query, (err, results, fields) => {
            if (err) {
                
                return res.status(500).send({ success: false, message: err.message });
            }
            
            return res.status(200).send(results);
        });
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
}

