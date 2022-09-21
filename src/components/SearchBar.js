import { useEffect, useState } from "react";
import "../assets/css/SearchBar.css";
import searchIcon from "../assets/img/icons/search.svg";
function SearchBar(props) {
  console.log(props);
  const [searchValue, setSearchValue] = useState("");
  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event) {
    if (searchValue === "") {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    props.showSearchOnFeed(searchValue);
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
    </div>
  );
}

export default SearchBar;
