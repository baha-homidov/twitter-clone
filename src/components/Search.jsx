import { useEffect, useState } from "react";
import "../assets/css/Search.css";
import searchIcon from "../assets/img/icons/search.svg";
import arrow from "../assets/img/icons/arrow.svg";
function Search(props) {
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
    alert(searchValue);
  }

  useEffect(() => {
    setSearchValue(props.initSearchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-container">
      <button className="back" onClick={props.hideSearchOnFeed}>
        <img src={arrow} alt="" className="search-icon" />
      </button>
      <form className="search-form" onSubmit={handleSubmit}>
        <button className="submit" type="submit">
          <img src={searchIcon} alt="" className="search-icon" />
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

export default Search;
