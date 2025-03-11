import React, { useEffect } from "react";
import NoizeeForArtist from "/public/Noizee For Artists.svg";
import axios from "axios";
import { useState } from "react";
import { AddTrack } from "./Tracks/AddTrack";

const ArtistDashboard = () => {


  const artistDetails = JSON.parse(sessionStorage.getItem('artistDetails'))

  const [artist,setArtist] = useState()
  const [formVisible,setFormVisible] = useState(false);


  const logout = () => {
    sessionStorage.removeItem("artistDetails")
    window.location.href = "http://localhost:5173/artist/register"
  }

  const getArtistDetails = () => {
    try {
        axios.get(`http://localhost:5000/local/artist/${artistDetails[0].artist_id}`,{
          headers:{
            "Content-Type":"application/json"
          }
        }).then((res) => {
          if(res.status === 200){
            setArtist(res.data)
          } 
        }).catch((error) => {
          console.log(error);
        })
      
    } catch (error) {
      return error
    }
  }

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(menu => {
            menu.classList.remove('active');
        });
        item.classList.add('active');
    });
  });

  document.querySelectorAll('.playlist-item').forEach(item => {
      item.addEventListener('click', () => {
          document.querySelectorAll('.playlist-item').forEach(menu => {
              menu.classList.remove('active');
          });
          item.classList.add('active');
      });
  });

  useEffect(() => {
    getArtistDetails();
  },[]);

  return (
    <div>
      <div className="main-page">
        <div className="sidebar">
          <img src={NoizeeForArtist} className="logo" alt="Noizee" />
          <div className="menu">
            <a href="artists.html">
              <div className="menu-item active">
                <i className="ri-user-6-line"></i>
                ARTISTS
              </div>
            </a>
            <a href="music.html">
              <div className="menu-item">
                <i className="ri-music-line"></i>
                MUSIC
              </div>
            </a>
          </div>
        </div>

        <div className="main">
          <div className="top-bar">
            <h2>ARTIST DASHBOARD</h2>
            <div className="auth">
              <button onClick={()=> logout()} href="#" className="auth-link">
                LOGOUT
              </button>
              <div classNameName="profile-icon"></div>
            </div>
          </div>

          <div className="container">
            <header className="artist-header">
              <img src={artist.image} alt="Arijit Singh" className="artist-img" />
              <div className="artist-info">
                <div>
                  <h1></h1>
                </div>
                <div>
                  <button className="add-song" onClick={() => setFormVisible(true)}>Add Song</button>
                </div>
              </div>

              <div className="song-count">
                1.5k <br /> Songs
              </div>

            </header>

            <div>

            { 
            formVisible && formVisible == true ? (
              <div className="form-container" id="songForm">
                  <div>
                  <h2 class="form-title">Add Song</h2><br/>
                    <AddTrack/>
                    <button classNameName="cancel-btn" id="cancelSong" onClick={(e) => setFormVisible(false)}>
                      Cancel
                    </button>
                  </div>
            </div>
              ):(
                <div></div>
              )
              }
          </div>

            <section classNameName="top-songs">
              <h2>Top Songs</h2>
              <div classNameName="songs">
                <div classNameName="song">
                  <img src="album.png" alt="album" />
                  <div classNameName="info">
                    <div>
                      Sajni (From "Laapataa Ladies"){" "}
                      <p classNameName="artist">Arijit Singh</p>
                    </div>

                    <p classNameName="album-name">
                      Sajni (From "Laapataa Ladies")
                    </p>
                  </div>
                  <p>2:50</p>
                </div>
                <div className="song">
                  <img src="album.png" alt="album" />
                  <div className="info">
                    <div>
                      Sajni (From "Laapataa Ladies"){" "}
                      <p className="artist">Arijit Singh</p>
                    </div>

                    <p className="album-name">Sajni (From "Laapataa Ladies")</p>
                  </div>
                  <p>2:50</p>
                </div>
                <div className="song">
                  <img src="album.png" alt="album" />
                  <div className="info">
                    <div>
                      Sajni (From "Laapataa Ladies"){" "}
                      <p className="artist">Arijit Singh</p>
                    </div>

                    <p className="album-name">Sajni (From "Laapataa Ladies")</p>
                  </div>
                  <p>2:50</p>
                </div>
                <div className="song">
                  <img src="album.png" alt="album" />
                  <div className="info">
                    <div>
                      Sajni (From "Laapataa Ladies"){" "}
                      <p className="artist">Arijit Singh</p>
                    </div>

                    <p className="album-name">Sajni (From "Laapataa Ladies")</p>
                  </div>
                  <p>2:50</p>
                </div>
                <div className="song">
                  <img src="album.png" alt="album" />
                  <div className="info">
                    <div>
                      Sajni (From "Laapataa Ladies"){" "}
                      <p className="artist">Arijit Singh</p>
                    </div>

                    <p className="album-name">Sajni (From "Laapataa Ladies")</p>
                  </div>
                  <p>2:50</p>
                </div>

                <div className="show-all">Show all</div>
              </div>
            </section>

            <section className="top-albums">
              <h2>Top Albums</h2>
              <div className="albums-container">
                <div className="albums">
                  <div className="album">
                    <div className="album-box"></div>
                    <span>Album 1</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="about">
              <h2>About</h2>
              Arijit Singh is one of the most iconic playback singers in India,
              celebrated for his soulful voice and unmatched versatility. He
              rose to fame with the blockbuster hit "Tum Hi Ho" from Aashiqui 2
              (2013) and has since become a sensation across Bollywood and
              beyond. Known for his ability to evoke deep emotions, Arijit
              effortlessly transitions between romantic ballads, heart-wrenching
              melodies, and high-energy tracks.
              <br /> <br />
              With chartbusters like "Channa Mereya," "Tera Fitoor," "Kesariya,"
              and "Gerua," his music has struck a chord with millions. A
              multiple award winner, Arijit has redefined playback singing,
              cementing his legacy as a voice that transcends generations. His
              songs remain timeless, making him one of the most streamed and
              loved artists in the world of music.
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      * {
            font-family: teko;
        }

        ::-webkit-scrollbar {
            display: none;
        }

        ::placeholder {
            color: #666666;
            font-size: .8rem;
        }

        input {
            font-family: "teko";
            font-weight: 500;
            height: .8em;
            border: none;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        body {
            margin: 0;
            font-family: teko;
            background-color: #05040c;
            color: white;
        }

        .sidebar {
            box-shadow: .15px 0px 0px 0px #f2c178;
            width: 12em;
            background: #0c0925;
            padding: 20px;
            display: flex;
            flex-direction: column;
        }

        .logo {
            width: 5em;
            align-self: center;
            margin-bottom: 20px;
        }

        .menu {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-top: 20px;
        }

        .menu-item {
            display: flex;
            align-items: center;
            padding: 5px 25px;
            border-radius: 3px;
            cursor: pointer;
            font-family: "teko semibold";
            font-size: 1.1rem;
            color: #fff;
            text-shadow: 1.5px 1px 0px #4949bf;
        }

        .menu-item i {
            font-size: 18px;
            margin-right: 10px;
            position: relative;
            bottom: 1.9px;
        }

        .menu-item:hover {
            background: #333157;
        }

        .menu-item.active {
            background: #282870;
            color: #ffba53;
            text-shadow: .9px 1px 0px #935d07;
        }



        .main-page {
            display: flex;
        }




        .main {
            flex: 1;
            padding: 30px;
            overflow-y: auto;
            gap: 10px;
        }

        .top-bar {
            font-size: 1.2rem;
            margin-top: -20px;
            text-shadow: 2px 2px 0px #935d07;
            display: flex;
            width: 95%;
            justify-content: space-between;
        }

        .auth {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .auth-link {
            text-decoration: none;
            font-size: 17px;
            color: white;
            font-weight: 500;
            position: relative;
            top: -15px;
            text-shadow: .9px 1px 0px #4949bf;

        }

        .profile-icon {
            position: relative;
            top: -15px;
            width: 30px;
            height: 30px;
            background-color: #f2c94c;
            box-shadow: 1px 1px 0px 1px #935d07;
            border-radius: 50%;
            cursor: pointer;
        }

        .container {
            position: relative;
            bottom: 15px;
            width: 100%;
        }

        .artist-header {
            display: flex;
            align-items: center;
            background-color: #282870;
            padding: 10px 45px;
            box-shadow: 5px 5px 0px #4949bf;
        }

        .artist-img {
            width: 110px;
            height: 110px;
            background-color: #ffba53;
            box-shadow: 5px 5px 0px #4949bf;
            margin-right: 25px;
        }

        .artist-info h1 {
            margin: 0;
            color: #ffba53;
            position: relative;
            top: 25px;
            font-size: 3rem;
        }

        .artist-info p {
            position: relative;
            bottom: 5px;
        }

        .add-song {
            background-color: #ffba53;
            box-shadow: 2px 2px 0px 1px #935d07;
            border: none;
            padding: 5px 25px;
            color: #000000;
            font-weight: 500;
            margin-top: 10px;
            position: relative;
            bottom: 27px;
            cursor: pointer;
            font-size: 1.1rem;
        }
        .add-song:hover{
            background-color: #f2c178;
        }

        .song-count {
            background-color: #ffba53;
            padding: 10px 20px;
            font-weight: 600;
            font-size: 1.2rem;
            text-align: center;
            color: #000000;
            box-shadow: 4px 4px 0px #935d07;
            margin-left: auto;
        }

        .top-songs,
        .top-albums,
        .about {
            margin-top: 40px;
        }

        .albums-container {
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .albums {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            white-space: nowrap;
            scroll-behavior: smooth;
            padding-bottom: 10px;
        }

        .albums::-webkit-scrollbar {
            display: none;
        }

        .album {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 0 0 calc(100% / 6 - 20px);
        }

        .album-box {
            width: 100px;
            height: 100px;
            background-color: #ffba53;
            box-shadow: 2px 2px 0px 1px #935d07;
            border-radius: 5px;
        }

        .album span {
            margin-top: 5px;
            color: white;
            font-size: 14px;
            text-align: center;
        }

        .about {
            line-height: 18px;
            background-color: #282870;
            padding: 5px 25px;
            box-shadow: 5px 5px 0px #4949bf;
            border-radius: 5px;
        }

        .about h2 {
            color: #ffba53;

        }

        .about p {
            width: 90%;
        }


        .songs {
            width: 95%;
            position: relative;
            bottom: 20px;
        }

        .songs .song {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
        }

        .songs .song .info {
            display: flex;
            align-items: center;
        }

        .song img {
            width: 50px;
            height: 45px;
            border-radius: 5px;
            background-color: #282870;
            margin-right: 15px;
            box-shadow: 2px 2px 0px 1px #4949bf;

        }

        .song .info {
            display: flex;
            justify-content: space-around;
            width: 100%;
            position: relative;
            right: 9em;
            top: 4px;
        }

        .song .info p {
            margin: 0;
        }

        .song .info .artist {
            color: #aaa;
            font-size: 13px;
        }

        .show-all {
            text-align: right;
            margin-top: 10px;
            color: #aaa;
            cursor: pointer;
            font-size: 14px;
        }

        .album-name {
            color: #aaa;
        }

        .show-all:hover {
            color: #6b46c1;
        }




        input {
            font-family: "teko";
            font-weight: 500;
            height: .8em;
            border: none;
        }

        .fade-background::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            /* Dark overlay */
            z-index: 999;
        }


        .form-container {
            position: fixed;
            top: 0;
            right: 0;
            width: 300px;
            height: 100%;
            background: #282870;
            padding:10px 20px;
            box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }

        .form-container h2 {
            color: #ffffff;
        }

        .form-container input {
            width: 95%;
            padding: 10px;
            border: none;
        }

        .form-container label {
            position: relative;
            top: 10px;
        }

        .form-container button {
            width: 100%;
            padding: 8px;
            font-weight: 500;
            font-size: 1rem;
            margin-top: 10px;
            background-color: #ffba53;
            box-shadow: 2px 2px 0px 1px #935d07;

            border: none;
            cursor: pointer;
        }
        .form-container button:hover{
            background-color: #f2c178;
        }

        .form-container .cancel-btn {
            margin-top: 10px;

        }

        .form-title {
            background-color: #4949bf;
            color: white;
            display: inline-block;
            padding: 5px 15px;
            font-size: 18px;
            width: 50%;
            position: relative;
            left: 65px;
            text-align: center;
            font-weight: 500;
        }

        input,
        textarea {
            width: 95%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: none;
            outline: none;
            background-color: #fdfdfd;
        }

        .file-input-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #ffffff;
            padding: 0px;
            border: 2px solid black;
            color: rgb(0, 0, 0);
            margin-top: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            font-weight: 500;
        }

        .form-container .file-input-container label {
            position: relative;
            background-color: #ffffff;
            padding: 10px;
            width: 100%;
            cursor: pointer;
            top: 0px;
            text-align: center;
        }`}
        </style> 
    </div>
  );
};

export default ArtistDashboard;
