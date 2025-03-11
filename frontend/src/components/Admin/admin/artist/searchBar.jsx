import React from 'react';

const SearchBar = ({ placeholder }) => {
  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} id="search-input" />
      <i className="ri-search-line"></i>
    </div>
  );
};

export default SearchBar;
