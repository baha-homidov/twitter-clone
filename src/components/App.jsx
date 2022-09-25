import Navbar from "./Navbar";
import Feed from "./Feed";
import SearchBar from "./SearchBar";
import WhoToFollow from "./WhoToFollow";
import { useState } from "react";
import "../assets/css/App.css";
// <Outlet /> component to tell the react router where to render child components
import { Outlet } from "react-router-dom";
function App() {
  const [feedShowsSearch, setFeedShowsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("asdf");
  const [showTopBar, setShowTobBar] = useState(true);
  function showSearchOnFeed(searchValue) {
    console.log("click");
    setFeedShowsSearch(true);
    setSearchValue(searchValue);
    setShowTobBar(false);
  }

  function hideSearchOnFeed() {
    setFeedShowsSearch(false);
    setSearchValue("");
    setShowTobBar(true);
  }

  return (
    <div className="app-container">
      <div className="main-content">
        {showTopBar && (
          <div className="top-bar">
            <button className="profile">
              <img src="" alt="" className="navbar-icon" />
              <span className="button-text">Profile</span>
            </button>
            <h2 className="latest-tweets">Latest Tweets</h2>
          </div>
        )}
        <Navbar showSearchOnFeed={showSearchOnFeed} />

        <div className="center-content-container">
          <Outlet />
          <Feed
            feedShowsSearch={feedShowsSearch}
            searchValue={searchValue}
            hideSearchOnFeed={hideSearchOnFeed}
          />
        </div>
      </div>
      <aside className="right-bar">
        <SearchBar showSearchOnFeed={showSearchOnFeed} />
        <WhoToFollow />
      </aside>
    </div>
  );
}

export default App;
