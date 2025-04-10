"use strict"
import conn from "../../../index.js";

export const getArtistGenre = async(id) =>{
    try {   
        
        const query = `SELECT genre FROM tblartist WHERE artist_id = '${id}';`
        
        return new Promise((resolve,reject) => {
            conn.query(query,(err,results,fields) => {
                if(err){
                    reject(err)
                }                
                resolve(results[0])
            });
        })
    } catch (error) {
        return error;
    }
}

export const getArtistIds = async(column) => {
    try {

      const query = `SELECT tblsongs.${column} FROM tblsongs inner join tblartist on tblsongs.artist_id = tblartist.artist_id WHERE tblartist.artist_name in ("Arijit Singh","Shreya ghosal","Yo Yo Honey Singh","Stebin ben","Taylor Swift","One Direction","BTS","BlackPink","V","The Weeknd");`;
      
      return new Promise((resolve,reject) => {

        conn.query(query,(err,results,fields) => {
          if(err){
            reject(err)
          }
          else{
           resolve(results)
          }
        })
      })
    } catch (error) {
      return error;
    }
  }
