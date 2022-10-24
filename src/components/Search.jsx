/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../assets/css/Search.css";
import searchIcon from "../assets/img/icons/search.svg";
import User from "./User";
import arrow from "../assets/img/icons/arrow.svg";
import { useParams, Link, useNavigate } from "react-router-dom";
import { searchUsers } from "../FirebaseBackend";
import Loading from "./Loading";
import FollowButton from "./FollowButton";

function Search(props) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [activeButton, setActiveButton] = useState("people"); //"people"||"posts"    state for controlling active buttons
  const [userResultArr, setUserResultArr] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const searchParam = useParams(); // access params from URL

  async function searchUserFromBackend(searchValue) {
    setShowLoading(true);
    const resultArr = await searchUsers(searchValue);
    setShowLoading(false);
    setUserResultArr(resultArr);
  }

  function handleChange(event) {
    setSearchValue(event.target.value);
    searchUserFromBackend(event.target.value);
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
      searchUserFromBackend(searchParam.searchId);
    }
  }, []);

  return (
    <div className="search-container">
      <div className="bar">
        <button
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrow} alt="" className="back-icon" />
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
      <div className="category-buttons">
        <button
          onClick={() => {
            setActiveButton("people");
          }}
          className={activeButton === "people" ? "people active" : "people"}
        >
          People <span className="blue-bar"></span>{" "}
        </button>
        <button
          onClick={() => {
            setActiveButton("posts");
          }}
          className={activeButton === "posts" ? "posts active" : "posts"}
        >
          Posts <span className="blue-bar"></span>
        </button>
      </div>
      <div className="search-results">
        {showLoading && <Loading />}
        {activeButton === "people" && (
          <div className="people-results">
            {userResultArr.map((element, index) => {
              return (
                <Link key={index} to={`/profile/${element.uid}`}>
                  <div className="user-wrapper">
                    <User userInfo={element} />
                    <FollowButton />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
