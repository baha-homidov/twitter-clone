/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../assets/css/Search.css";

import User from "./User";

import {
  useParams,
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { searchUsers } from "../FirebaseBackend";
import Loading from "./Loading";
import FollowButton from "./FollowButton";

function Search(props) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [activeButton, setActiveButton] = useState("people"); //"people"||"posts"    state for controlling active buttons
  const [userResultArr, setUserResultArr] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentAuthedUser, setCurrentAuthedUser] = useOutletContext(); // get authInfo passed by App.jsx
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
  }

  useEffect(() => {
    // if there is a searchId
    // set searhValue to the passed argumnet while the first render
    if (searchParam.searchId) {
      setSearchValue(searchParam.searchId);
      searchUserFromBackend(searchParam.searchId);
    } else {
      // search with blank value when first loaded
      setSearchValue("");
      searchUserFromBackend("");
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
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"
            ></path>
          </svg>
        </button>

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
      </div>
      <div className="category-buttons">
        <button
          onClick={() => {
            setActiveButton("people");
          }}
          className="people active"
        >
          People <span className="blue-bar"></span>{" "}
        </button>
      </div>
      <div className="search-results">
        {showLoading && <Loading />}
        {userResultArr.length === 0 && !showLoading && (
          <div className="no-result">No Search Results</div>
        )}
        <div className="people-results">
          {userResultArr.map((element, index) => {
            return (
              <Link key={index} to={`/profile/${element.uid}`}>
                <div className="user-wrapper">
                  <User userInfo={element} />

                  {element.uid !== currentAuthedUser.uid && (
                    <FollowButton
                      currentUserId={currentAuthedUser.uid}
                      targetUserId={element.uid}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
