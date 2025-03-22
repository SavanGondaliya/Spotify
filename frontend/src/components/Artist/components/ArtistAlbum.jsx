import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const ArtistAlbumPage = () => {
  const [albums, setAlbums] = useState([]);

  const getArtistAlbums = () => {
    const artistDetails = JSON.parse(
      sessionStorage.getItem("artistDetails")
    )[0];
    axios
      .get(`http://localhost:5000/local/${artistDetails?.artist_id}/albums`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAlbums(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getArtistAlbums();
  }, []);
  console.log(albums);

  return (
    <div>
      <div className="mt-6">
        <h2 className="text-white text-xl font-bold">Top Albums</h2>
        <div className="flex space-x-4 mt-4 overflow-x-auto">
          <div class="top-albums">
            <div class="albums-container">
              <div class="albums">
                {albums.map((album) => (
                  <NavLink to={`http://localhost:5173/albums/${album.album_id}`} class="album">
                    <div class="album-box">
                      <img src={album.image} alt="Image not Found" srcset="" />
                    </div>
                    <span>{album.album_name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{
                `
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
                }
                `
                }
            </style>
    </div>
  );
};
