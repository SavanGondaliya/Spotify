import React from 'react';
// import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <div id="app">
            <nav className="navbar">
                <div className="search-bar">
                    <input type="text" placeholder="Search your favorites" id="search-input" />
                    <button className="search-btn" id="search-btn">
                        <i className="ri-search-line"></i>
                    </button>
                </div>
                <div className="auth">
                    {/* <Link to="/" className="auth-link">LOGIN/SIGN IN</Link> */}
                    <div className="profile-icon"></div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;