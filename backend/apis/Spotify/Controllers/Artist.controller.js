import axios from "axios";
import { userToken } from "../Helpers/Auth.helper.js";
import { getArtistGenre } from "../Helpers/Artist.helper.js";
import conn from "../../../index.js";

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
        return res.status(500).send({message : error});
    }
}


export const getArtistAlbum = async(req, res) => {
    try {
        
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);
        const {id} = req.params;
        
        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }
        
        const type = "single";
        const limit = 6;     
        const offset = 0;
        
        const response  = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums?type=${type}&limit=${limit}&offset=${offset}`,{
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

export const getFeaturedAlbum = async(req, res) => {
    try {
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);
        const {id} = req.params;
        
        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }
        
        const type = "appears_on";
        const limit = 4;     
        const offset = 6;
        
        const response  = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums?type=${type}&limit=${limit}&offset=${offset}`,{
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
        
        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }
        
        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization":  `Bearer ${authToken}`
            }
        });
        if(response.status === 200){
            return res.status(response.status).send(response.data);
        }
        return res.status(404).send({message : response.data.statusText});
    } catch (error) {   
        
        return res.status(500).send({message : error.message});
    }
}

export const getMultipleArtits = async(req, res) => {
    try {
        
        const userDetails = JSON.parse(req.query.session_details);
        const authToken = await userToken(userDetails);
        const {ids} = req.query 

        if(!authToken){
            return res.status(401).send({message : res.statusText});
        }
        
        const response = await axios.get(`https://api.spotify.com/v1/artists?ids=${ids}`,{
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

export const kpopArtist = async(req, res) => {
    try {
        
        const query = `SELECT * FROM tblartist WHERE genre LIKE '%k-pop%' ORDER BY popularity DESC LIMIT 10;`;
        
        conn.query(query, (err, results, fields) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(404).send({ success: false, message: err.message });
            }
            return res.status(200).send(results);
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

export const BollywoodArtist = async(req, res) => {
    try {
        
        const query = `select * from tblartist where popularity between 10 and 90 and genre='["bollywood","hindi pop","desi"]';`;
        
        conn.query(query, (err, results, fields) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(404).send({ success: false, message: err.message });
            }
            return res.status(200).send(results);
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

// export const addAlbums = async(album) => {
    
//     try {
//         album.items.forEach(element => { 
//             const query = `INSERT INTO tblalbum(album_id,album_name,image,total_tracks,artist_id) VALUES('${element.id}','${element.name}','${element.images[0].url}','${element.total_tracks}','${element.artists[0].id}');`;
            
//             return new Promise((resolve,reject) => {
                
//                 conn.query(query,(err) => {
//                     if(err){
//                         return reject();
//                     }
//                     resolve();
//                 })
//             }).catch((err) => {
//                 console.log(err);
//             })              
//         });
        
//     } catch (error) {
//         return error
//     }
// }

export const getLocalArtistDetails = async(req,res) => {
    try {
        
        const {id} = req.params;
        
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
        return res.status(500).send({message:error.message})
    }
}

export const TopBollywoodArtist = async(req, res) => {
    try {
        
        const query = `select * from tblartist where artist_name in ("arijit singh","Shreya Ghoshal","Dhvani Bhanushali","yo yo honey singh","ankit tiwari","Sonu Nigam","A R rahman","guru randhawa","pritam","Stebin Ben","Shankar Mahadevan") order by popularity desc;`;
        
        conn.query(query, (err, results, fields) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(404).send({ success: false, message: err.message });
            }
            return res.status(200).send(results);
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ success: false, message: error.message });
    }
};


export const TopHollywoodArtist = async(req, res) => {
    try {
        
        const query = `SELECT * FROM tblartist WHERE artist_name IN("Taylor Swift","Bruno Mars","ZAYN","Ellie Goulding","Justin Bieber","The Weeknd","One Direction","Coldplay","Haley Reinhart","Alan Walker") ORDER BY popularity DESC;`;
        
        conn.query(query, (err, results, fields) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(404).send({ success: false, message: err.message });
            }
            return res.status(200).send(results);
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

export const getRelatedArtist = async(req,res) => {
    try {
        
        const artist_id = req.query.artist_id;
        const {genre} = await getArtistGenre(artist_id);          
        const query = `SELECT artist_id FROM tblartist WHERE genre LIKE '%${genre}' LIMIT 4 OFFSET ${Math.floor(Math.random()*6)};`;
        
        conn.query(query,(err,results,fields) => {
            if(err){
                return res.status(404).send({message : res.statusText});                    
            }else{
                return res.status(200).send(results)
            }
        });
        
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}


export const getNewArtist = async(req, res) =>{ 
    try {

        const query = `select * from tblartist order by created_at desc limit 10`;

        conn.query(query,(err,results) => {
            if(err){
                return res.status(404).send({message:err});
            }
            return res.status(200).send(results)
        })

    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}

export const getLocalArtistTracks = async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).send({message:error})
    }
}