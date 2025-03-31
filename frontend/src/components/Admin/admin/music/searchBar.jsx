import React from 'react';

const SearchBar = ({ placeholder }) => {
  return (
    <div className="__music_search_bar__">
      <input className='__search_input__' type="text" placeholder={placeholder} id="search-input" />
      <i className="ri-search-line"></i>
    </div>
  );
};

export default SearchBar;
