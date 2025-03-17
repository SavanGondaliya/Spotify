import conn from "../../index.js";

export const countArtist = async() => {
    try {
        
        const query = `select count(*) as Artists from tblartist;`;

        return new Promise((resolve,reject) => {

            conn.query(query,(err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results[0])
            });
        })
    } catch (error) {
        return error
    }
} 


export const countSongs = async() => {
    try {
        const query = `Select count(*) Songs from tblsongs;`;

        return new Promise((resolve,reject) => {

            conn.query(query,(err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results[0])
            });
        })
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
} 


export const countAlbum = async(req,res) => {
    try {
        
        const query = `select count(*) as Albums from tblalbum;`;

        return new Promise((resolve,reject) => {

            conn.query(query,(err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results[0])
            });
        })
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
} 


export const countUser = async() => {
    try {
        
        const query = `select count(*) as Users from tbluser;`;
        return new Promise((resolve,reject) => {

            conn.query(query,(err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results[0])
            });
        })
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
} 