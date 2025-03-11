import React, { useState } from 'react';
import Playlist from './playlistitems';

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('home');
    const [activePlaylist, setActivePlaylist] = useState(0);

    const menuItems = [
        { id: 'home', icon: 'ri-home-4-line', label: 'HOME' },
        { id: 'music', icon: 'ri-music-line', label: 'MUSIC' },
        { id: 'playlist', icon: 'ri-play-list-line', label: 'PLAYLIST' },
        { id: 'favorite', icon: 'ri-heart-line', label: 'FAVORITE' },
    ];

    const playlists = [
        'New Playlist 1',
        'New Playlist 2',
        'New Playlist 3',
        'New Playlist 4',
    ];

    return (
        <div className="sidebar">
            <img src="/logo.svg" className="logo" alt="Noizee" />
            <div className="menu">
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                        onClick={() => setActiveMenu(item.id)}
                    >
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="playlists">
                <h4>MY PLAYLISTS</h4>
                {playlists.map((playlist, index) => (
                    <Playlist
                        key={index}
                        title={playlist}
                        isActive={index === activePlaylist}
                        onClick={() => setActivePlaylist(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;