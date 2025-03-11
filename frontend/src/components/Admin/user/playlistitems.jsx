import React from 'react';

const Playlist = ({ title, isActive, onClick }) => {
    return (
        <div 
            className={`playlist-item ${isActive ? 'active' : ''}`} 
            onClick={onClick}
        >
            <div className="icon"></div>
            <div className="text">
                <p>{title}</p>
                <span>Playlist</span>
            </div>
        </div>
    );
};

export default Playlist;
      