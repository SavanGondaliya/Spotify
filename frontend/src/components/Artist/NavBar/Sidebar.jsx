import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {

    const artistDetails = JSON.parse(sessionStorage.getItem("artistDetails"));

    return(
        <div>
            {/* <div className="sidebar">
                <img src="/Noizee_For_Artists.svg" className="logo" alt="Noizee" />
                <div className="menu">
                    <NavLink to={`http://localhost:5173/artist/dashboard`} className="menu-item active">
                        <i className="ri-user-6-line"></i>
                        ARTISTS
                    </NavLink>
                    <NavLink to={`http://localhost:5173/${artistDetails[0]?.artist_id}/albums`} className="menu-item">
                        <i className="ri-music-line"></i>
                        Albums
                    </NavLink>
                </div>
            </div> */}

{/* const Sidebar = () => { */}
  {/* return ( */}
            <div className="h-screen bg-indigo-900 p-4 text-white">
            <div className="mb-6">
                <img src="/logo.png" alt="Noizee" className="w-16" />
            </div>
            <nav className="space-y-4">
                <button className="w-full py-2 bg-yellow-600 rounded">ARTISTS</button>
                <button className="w-full py-2 bg-transparent hover:bg-indigo-700">MUSIC</button>
            </nav>
            </div>
  {/* ); */}
{/* }; */}

            <style>
                {
                `.sidebar {
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
                }`
                }
            </style>
        </div>
    )

}