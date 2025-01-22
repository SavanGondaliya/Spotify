import mysql from "mysql2";
import conn from "./index.js"

export const createDatabase = () => {
    const query = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`;
    conn.query(query,(error) => {
        if(error){
            console.log('Unable to Create Database due to : ',error);
            return
        }
        return process.env.DATABASE_NAME
    });
}

export const tblUser = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS TBLUSER(
            user_id INTEGER PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at VARCHAR(255) NOT NULL,
            updated_at VARCHAR(255) NOT NULL
        );`

        conn.query(query,(error) => {
            if(error){
                console.log(`Failed To Create Table Due to : ${error}`);
                return;
            }
        });
}


    export const tblArtist = () => {

        const query = `
            CREATE TABLE IF NOT EXISTS tblArtist(
            artistId VARCHAR(255) PRIMARY KEY,
            artist_name VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            image VARHCAR(255) NOT NULL,
            bio VARCHAR(255) NOT NULL,
            created_at VARHCAR(255) NOT NULL,
            updated_at VARCHAR(255) NOT NULL 
        );`

        conn.query(query,(error) => {
            if(error){
                console.log(`Failed to Create Table Due to : ${error}`);
                return
            }
        });
    }
    
    export const tblAdmin = () => {
        const query = `
            CREATE TABLE IF NOT EXISTS tbladmin(
            admin_id VARCHAR(255) PRIMAY KEY NOT NULL,
            name  VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            created_at VARCHAR(255) NOT NULL
        );`

        conn.query(query,(error) => {
            if(error){
                console.log(`error due to : ${error}`);
            }
            return;
        });
    }

    export const songs = () => {
        const query = `
            CREATE TABLE IF NOT EXISTS tblSongs(
            song_id VARCHAR(255) PRIMARY KEY NOT NULL,
            title VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            duration INTEGER NOT NULL,
            release_date VARCHAR(255) NOT NULL,
            song_url VARCHAR(255) NOT NULL,
            created_at VARCHAR(255) NOT NULL
        )`;
        conn.query(query,(error) => {
            if(error){
                console.log(`Failed due to : ${error}`);
            }
            return;
        });
    }
    
    export const tblPlayList = () => {
        const query  = `
            CREATE TABLE IF NOT EXISTS tblPlaylist(
                playlist_id VARCHAR(255) PRIMARY KEY,
                playlist_name VARCHAR(255) NOT NULL,
                bio VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                isPublic BOOLEAN DEFAULT TRUE,
                user_id 
        );`;
    }

export default (createDatabase,tblUser);