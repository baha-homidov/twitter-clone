import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "../assets/css/SearchBar.css";
import searchIcon from "../assets/img/icons/search.svg";
function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event) {
    if (searchValue === "") {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    navigate(`/search/${searchValue}`);
    // props.showSearchOnFeed(searchValue);
    setSearchValue("");
  }
  return (
    <div className="searchbar-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <button className="submit" type="submit">
          <img src={searchIcon} alt="" className="searchbar-icon" />
        </button>
        <input
          className="field"
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search Barker"
        />
      </form>
      {searchValue.length > 0 && (
        <div onClick={handleSubmit} className="pop-up">
          <span>Search for</span>
          <span className="search-value">"{searchValue}"</span>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
