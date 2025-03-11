import conn from "./index.js"

    export const createDatabase = () => {
        const query = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`;
        conn.query(query,(error) => {
            if(error){
                console.log('Unable to Create Database due to : ',error);
                return
            }
            return process.env.DATABASE_NAME;
        });
    }


    export const tblUser = () => {

        const query = `
            CREATE TABLE IF NOT EXISTS tbluser (
                user_id VARCHAR(255) PRIMARY KEY    ,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                gender VARCHAR(255) NOT NULL,
                dob DATE NOT NULL,
                image TEXT,
                session_details JSON NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `;

        conn.query(query,(error) => {
            if(error){
                console.log(`Failed To Create Table Due to : ${error}`);
                return;
            }
        });
    }

    export const tblArtist = () => {

        const query = `
            CREATE TABLE IF NOT EXISTS tblartist(
            artist_id VARCHAR(255) PRIMARY KEY,
            artist_name VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            image VArCHAR(255) NOT NULL,
            bio VARCHAR(255) NOT NULL,
            popularity INTEGER NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
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
            admin_id VARCHAR(255) PRIMARY KEY NOT NULL,
            name  VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        );`;

        conn.query(query,(error) => {
            if(error){
                console.log(`error due to : ${error}`);
            }
            return;
        });
    }

    export const tblSong = () => {

        const query = `
            CREATE TABLE IF NOT EXISTS tblsongs(
                song_id VARCHAR(255) PRIMARY KEY NOT NULL,
                title VARCHAR(255) NOT NULL,
                duration INTEGER NOT NULL,
                song_url VARCHAR(255) NOT NULL,
                artist_id VARCHAR(255) NOT NULL,
                album_id VARCHAR(255) NOT NULL,
                liked_by TEXT(1000),
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (artist_id) REFERENCES tblartist(artist_id)
            );`;

        conn.query(query,(error) => {
            if(error){
                console.log(`Failed due to : ${error}`);
            }
            return;
        });
    }
    
    export const tblAlbum = () => {

        const query = `
            CREATE TABLE IF NOT EXISTS tblalbum(
                album_id VARCHAR(255) PRIMARY KEY,
                album_name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                total_tracks INTEGER NOT NULL DEFAULT 1,
                artist_id VARCHAR(255) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
                FOREIGN KEY (artist_id) REFERENCES tblartist(artist_id)
            );
        `
        conn.query(query,(err) => {
            if(err){
                console.log(err);
            }
            return;
        });
    }

    export const tblPlaylist = () => {
        const query  = `
            CREATE TABLE IF NOT EXISTS tblPlaylist(
                playlist_id VARCHAR(255) PRIMARY KEY,
                playlist_name VARCHAR(255) NOT NULL,
                bio VARCHAR(255) NOT NULL,
                image VARCHAR(255),
                isPublic BOOLEAN NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                song_id VARCHAR(255),
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
                FOREIGN KEY (user_id) REFERENCES tbluser(user_id)
        );`;
        conn.query(query,(error) => {
            if(error ){
                console.log(error);
            }
            return;
        });
    }

    export const tblReport = () => {
        const query = `CREATE TABLE IF NOT EXISTS tblreport (
            report_id VARCHAR(255) NOT NULL PRIMARY KEY,
            report_month VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            streaming_time INT NOT NULL,
            listened_artist JSON NOT NULL,
            listened_songs JSON NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES tbluser(user_id)
        );`     
        conn.query(query,(error) => {
            if(error){
                console.log(error);
            }
            return;
        })
    }

export default (createDatabase,tblUser,tblAdmin,tblArtist,tblSong,tblPlaylist,tblAlbum,tblReport);