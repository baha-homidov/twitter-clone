import Navbar from "./Navbar";
import Feed from "./Feed";
import SearchBar from "./SearchBar";
import WhoToFollow from "./WhoToFollow";
import { useState, useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/App.css";
// <Outlet /> component to tell the react router where to render child components
import { Outlet } from "react-router-dom";
function App() {
  const [showTopBar, setShowTobBar] = useState(true);

  const redirect = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    //redirect to /home directory if on a root location
    if (location.pathname === "/") {
      redirect("home");
    }
  });

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
        <Navbar />

        <div className="center-content-container">
          <Outlet className="outlet-component" />
        </div>
      </div>
      <aside className="right-bar">
        <SearchBar />
        <WhoToFollow />
      </aside>
    </div>
  );
}

export default App;
