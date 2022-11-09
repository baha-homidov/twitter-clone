import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/SearchBar.css";

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
          <svg viewBox="0 0 24 24">
            <g>
              <g>
                <path
                  fill="currentColor"
                  d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
                ></path>
              </g>
            </g>
          </svg>
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
