import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

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
        <Feed
          feedShowsSearch={feedShowsSearch}
          searchValue={searchValue}
          hideSearchOnFeed={hideSearchOnFeed}
        />
      </div>
      <aside className="right-bar">
        <SearchBar showSearchOnFeed={showSearchOnFeed} />
      </aside>
    </div>
  );
}

export default App;
