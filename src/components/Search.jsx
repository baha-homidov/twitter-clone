import { useEffect, useState } from "react";
import "../assets/css/Search.css";
import searchIcon from "../assets/img/icons/search.svg";
import arrow from "../assets/img/icons/arrow.svg";
import { useParams, Link } from "react-router-dom";
function Search(props) {
  const [searchValue, setSearchValue] = useState("");
  const searchParam = useParams();
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
    // if there is a searchId
    // set searhValue to the passed argumnet while the first render
    if (searchParam.searchId) {
      setSearchValue(searchParam.searchId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-container">
      <div className="bar">
        <Link className="link" to={"/"}>
          <button className="back">
            <img src={arrow} alt="" className="back-icon" />
          </button>
        </Link>
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
    </div>
  );
}

export default Search;
