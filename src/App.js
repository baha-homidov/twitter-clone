import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

function App() {
  const [feedShowsSearch, setFeedShowsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("asdf");

  function showSearchOnFeed(searchValue) {
    console.log("click");
    setFeedShowsSearch(true);
    setSearchValue(searchValue);
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <Navbar />
        <Feed feedShowsSearch={feedShowsSearch} searchValue={searchValue} />
      </div>
      <aside className="right-bar">
        <SearchBar showSearchOnFeed={showSearchOnFeed} />
      </aside>
    </div>
  );
}

export default App;
