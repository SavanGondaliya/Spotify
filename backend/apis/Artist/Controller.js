import conn from "../../index.js";
import { generateRandomId, setAudioFile } from "./helper.js";
import {IncomingForm } from "formidable";
import { parseFile} from "music-metadata";
import { setImageFile } from "./helper.js";
import fs from "fs";
import path from "path";


const imageUploadDir = path.join("E:/projects/NoizeeMusicApp/backend/public/images/");
const trackUploadDir = path.join("E:/projects/NoizeeMusicApp/backend/public/audio/");

export const RegisterArtist =  async(req, res) => {
    
    if (!fs.existsSync(imageUploadDir)) {
        fs.mkdirSync(imageUploadDir, { recursive: true });
    }

    const form = new IncomingForm({ 
        imageUploadDir,
        keepExtensions: true,
    });
    
    
    form.parse(req, async (err, fields, files) => {

        if (err) {
            console.error("Error parsing form:", err);
            return res.status(400).json({ message: "Error parsing form" });
        }
        console.log(fields,files);
        
        let imagePath = "";
        const artist_id = await generateRandomId();
        const artistName = fields.name[0];
        const genre = fields.genre[0];
        const bio = fields.bio[0];
        const email = fields.email[0];
        const password = fields.password[0];
        const file = files.image[0];

        if(files.image){
            imagePath = await setImageFile(file,imageUploadDir);
        }else{
            imagePath = fields.trackUrl[0];
        }

        if (!artistName || !email || !file) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `INSERT INTO tblartist (artist_id, artist_name, genre, image, bio, popularity, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        conn.query(query, [artist_id,artistName,genre,imagePath,bio,0,email,password], (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(200).json({ message: "Album created", imagePath });
        });
    });

}

export const ArtistLogin = async(req, res) => {
    try {
        console.log('called....');
        
        const {name,password} = req.body;

        const query = `select * from tblartist where artist_name = '${name}' and password = '${password}';`;
        console.log(query);
        
        conn.query(query,(err,results,fields) => {
            if(results){
                return res.status(200).send(results);
            }
            return res.status(404).send({message:false});
        })

    } catch (error) {
        return res.status(500).send({message : error.message});
    }
}


export const createAlbum = async(req, res) => {

    if (!fs.existsSync(imageUploadDir)) {
        fs.mkdirSync(imageUploadDir, { recursive: true });
    }

    const form = new IncomingForm({ 
        imageUploadDir,
        keepExtensions: true,
    });
    
    form.parse(req, async (err, fields, files) => {

        if (err) {
            console.error("Error parsing form:", err);
            return res.status(400).json({ message: "Error parsing form" });
        }

        let imagePath = "";
        const artist_id = "008PpLcKUtVXle6JS2kq3I";
        const album_id = await generateRandomId();
        const album_name = fields.album_name[0];
        const total_tracks = fields.total_tracks[0];
        const file = files.image[0];

        if(files.image){
            imagePath = await setImageFile(file,imageUploadDir);
        }else{
            imagePath = fields.trackUrl[0];
        }

        if (!album_name || !total_tracks || !file) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `INSERT INTO tblalbum (album_id,album_name, total_tracks, image,artist_id) VALUES (?, ?, ?, ?, ?)`;
        conn.query(query, [album_id,album_name, total_tracks, imagePath,artist_id], (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(200).json({ message: "Album created", imagePath });
        });
    });
};

export const deleteAlbum = async(req,res) => {
    try {

        const {id} = req.params;

        const query = `delete from tblalbum where album_id = '${id}'`;

        conn.query(query,(err) => {
            if(err){
                return res.status(400).send({message:err});
            }
            return res.status(200).send({success:true});
        })

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const getAlbumById = async(req, res) => {
    try {
        console.log("called..");
        
        const {id} = req.params;
        console.log(id);
        
        const query = `SELECT tblalbum.image as albumImage,tblartist.image as artistImage,tblalbum.*,tblartist.* from tblalbum inner join tblartist on tblartist.artist_id = tblalbum.artist_id where tblalbum.album_id = ?`;

        conn.query(query,[id],(err,results,fields) => {
            if(err){
                console.log(err);
                
                return res.status(400).send({success:"false",message:err});
            }
            console.log(results);
            
            return res.status(200).send(results);
        })

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const updateAlbum = async(req, res) => {
    try {
               
    if (!fs.existsSync(imageUploadDir)) {
        fs.mkdirSync(imageUploadDir, { recursive: true });
    }

    const form = new IncomingForm({ 
        imageUploadDir,
        keepExtensions: true,
    });
    
    form.parse(req, async (err, fields, files) => {

        if (err) {
            console.error("Error parsing form:", err);
            return res.status(400).json({ message: "Error parsing form" });
        }

        let imagePath = ""
        const artist_id = fields.artist_id[0];
        const album_id = fields.album_id[0];
        const album_name = fields.album_name[0];
        const total_tracks = fields.total_tracks[0];
        
        if(files.image){
            const file = files.image[0];
            imagePath = await setImageFile(file,imageUploadDir);
        }else{
            imagePath = fields.image[0];
        }

        if (!album_name || !total_tracks ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `UPDATE tblalbum SET album_name=?, total_tracks= ?, image =? ,artist_id= ? WHERE album_id = ?`;
        conn.query(query, [album_name, total_tracks, imagePath,artist_id,album_id], (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(200).json({ message: "Album Updated"});
        });
    });

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const getArtistAlbums = async(req, res) => {
    try {

    const {id} = req.params;
    console.log(id,"request has come");
    
    const query = "SELECT tblalbum.image AS albumImage,tblartist.image AS artistImage,tblalbum.*,tblartist.* from tblalbum inner join tblartist on tblalbum.artist_id = tblartist.artist_id where tblartist.artist_id = ?";

    conn.query(query,[id],(err,results,fields) => {
        if(err){
            console.log(err);
            
            return res.status(400).send({message:"Not Found"})
        }
        console.log(results);
        
        return res.status(200).send(results)
    });

    } catch (error) {
        return res.status(500).send({message:error.message});        
    }
}

export const addTrack = async(req, res) => {
    try {

        const form = new IncomingForm({ 
            trackUploadDir,
            keepExtensions: true,
        });
        console.log("called...");
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error parsing form:", err);
            return res.status(400).json({ message: "Error parsing form" });
            }
                        
            const {artist_id} = req.query;
            const track_id = await generateRandomId();
            const album_id = fields.album_id[0];
            const track_name = fields.track_name[0];
            const track_number = fields.track_number[0];
            const file = files.track_url[0];
            
            if (!album_id || !track_name || !file) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            
            const metadata = await parseFile(file.filepath);
            const duration = metadata.format.duration;           
            const trackPath = await setAudioFile(file,trackUploadDir);
            console.log(metadata,duration,trackPath);
            
            const query = `INSERT INTO tblsongs (song_id,title,duration,song_url,artist_id,album_id,track_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            conn.query(query, [track_id,track_name,duration,trackPath,artist_id,album_id,track_number], (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error" });
                }
                res.status(200).json({ success: "true"});
            });
        });
        
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const deleteTrack = async(req, res) => {
    try {
    
        const {id}  = req.params;

        const query = `delete from tblsongs where song_id=?`;

        conn.query(query,[id],(err,results,fields)=>{
            if(err){
                return res.status(400).send({"success" : "false",message:err})
            }
            return res.status(200).send({"success":"true"});
        })

    } catch (error) {
        return res
    }
}


export const getArtistTracks = async(req, res) => {
    try {

        const {id} = req.params;

        const query = `select tblsongs.*,tblartist.*,tblalbum.* from tblsongs join tblalbum on tblsongs.album_id = tblalbum.album_id join tblartist on tblsongs.artist_id = tblartist.artist_id where tblartist.artist_id = ?`;

        conn.query(query,[id],(err,results,fields) =>{
            if(err){
                return res.status(400).send({success:"false",message:err});
            }
            return res.status(200).send(results);
        });

    } catch (error) {
        return res.status(500).send({message:error});
    }
}

export const  getTrackById = async(req,res) => {
    try {

        const {id} = req.params

        const query = `select tblsongs.*,tblartist.*,tblalbum.* from tblsongs join tblalbum on tblsongs.album_id = tblalbum.album_id join tblartist on tblsongs.artist_id = tblartist.artist_id  where tblsongs.song_id = ?`;

        conn.query(query,[id],(err,results,fields) => {
            if(err){
                return res.status(400).send({success:"false",message:err});
            }
            return res.status(200).send(results);
        })
    } catch (error) {
        return res.status(500).send({message:error});
    }
}

export const updateTrack = async(req,res) => {
    try {
        
        const form = new IncomingForm({ 
            trackUploadDir,
            keepExtensions: true,
        });
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error parsing form:", err);
            return res.status(400).json({ message: "Error parsing form" });
            }
                
            const artist_id = "008PpLcKUtVXle6JS2kq3I";
            const track_id = fields?.track_id[0];
            const album_id = fields?.album_id[0];
            const track_name = fields?.track_name[0];
            const track_number = fields?.track_number[0];
            let duration = fields?.duration[0];
            let trackPath = "";

            if(!files != {}){
                trackPath = fields?.track_url[0];
            }else{
               trackPath = await setAudioFile(files.track_url[0],trackUploadDir);
                const metadata = await parseFile(files.track_url[0]?.filepath);
                duration = metadata.format.duration;
            }
            console.log(track_name,duration,trackPath,artist_id,track_number,trackPath);
            
            const query = `UPDATE tblsongs set title=?,duration=?,song_url=?,artist_id=?,album_id=?,track_number=? where song_id  = ?`;
            conn.query(query, [track_name,Math.floor(duration),trackPath,artist_id,album_id,track_number,track_id], (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Database error" });
                }
                res.status(200).json({ success: "true"});
            });
        });
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

export const getArtistById = async(req, res) => {
    try {

        const {id} = req.params;
        console.log("called",id); 

        const query = `SELECT 
                tblartist.*, 
                (SELECT COUNT(*) FROM tblsongs WHERE tblsongs.artist_id = ?) AS total_songs
                FROM tblsongs 
                INNER JOIN tblartist ON tblsongs.artist_id = tblartist.artist_id 
                WHERE tblartist.artist_id = ? group by tblartist.artist_id;`
        
        conn.query(query,[id,id],(err,results,fields) => {
            if(err){
                return res.status(404).send({message:err})
            }
            console.log(results);
            return res.status(200).send(results)
        });

    } catch (error) {
        return res.status(500).send({message:error.message});        
    }
}

export const topTracks = async(req,res) => {
    try {
        const {artist_id} = req.query;
        const query = `Select tblalbum.*,tblsongs.*,tblartist.* from tblsongs inner join tblalbum on tblsongs.album_id = tblalbum.album_id inner join tblartist on tblsongs.artist_id = tblartist.artist_id where tblartist.artist_id = ? limit 5;`;
        
        conn.query(query,[artist_id],(err,results) => {
            if(err){
                return res.status(404).send({message:err})
            }
            return res.status(200).send(results);
        })

    } catch (error) {
        return res.status(500).send({message :error.message});
    }
}

export const getAlbumTracks = async(req, res) => {
    try {
        const {id} = req.params;
        
        const query = `SELECT tblalbum.image as AlbumImage,tblsongs.*,tblalbum.*,tblartist.* from tblsongs inner join tblalbum on tblsongs.album_id = tblalbum.album_id inner join tblartist on tblsongs.artist_id = tblartist.artist_id where tblalbum.album_id = ?;`;
        
        conn.query(query,[id],(err,results)=> {
            if(!err){
                return res.status(200).send(results);
            }
            return res.status(400).send({success:false});
        })
    } catch (error) {
        return error;
    }
}