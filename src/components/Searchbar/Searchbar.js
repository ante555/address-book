import React from "react";
import searchIcon from "../../images/search-icon.svg";
import "./searchbar.scss";

const SearchBar = ({ text, setText }) => {
  return (
    <div className="wrapper-search">
      <div className="content-search">
        <img className="img" src={searchIcon} alt="search-icon" />
        <input
          className="input"
          type="text"
          placeholder="Pretraži kontakte"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
    </div>
  );
};

export default SearchBar;
