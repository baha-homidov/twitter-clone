import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";
import messageIcon from "../assets/img/icons/message.svg";
import homeIcon from "../assets/img/icons/home.svg";
import tweetIcon from "../assets/img/icons/tweet.svg";
import userIcon from "../assets/img/icons/user.svg";
import searchIcon from "../assets/img/icons/search.svg";
function Navbar(props) {
  // state for tracking window and width and render the component accordingly
  const [windowWidth, setWindowWidth] = useState(0);

  function updateDimensions() {
    const width = window.innerWidth;
    setWindowWidth(width);
  }

  useEffect(() => {
    // listen to the windowWdith changes
    // equivalent of componentDidMount
    // call the function for initial render
    updateDimensions();

    // set a listener for future changes
    window.addEventListener("resize", updateDimensions);

    // equivalent of componentDidUnmount
    // release recources
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const responsive = {
    showMobileNavBar: windowWidth < 480,
  };

  if (responsive.showMobileNavBar) {
    //if the width is narrow render mobile navbar
    return (
      <div className="navbar-container">
        <nav className="horizontal-navbar">
          <Link className="link" to="home">
          <button className="home">
            <img src={homeIcon} alt="" className="navbar-icon" />
          </button>
          </Link>
          <Link className="link" to="/search">
            <button className="search">
              <img src={searchIcon} alt="" className="navbar-icon" />
            </button>
          </Link>
          <button className="messages">
            <img src={messageIcon} alt="" className="navbar-icon" />
          </button>
          <button className="tweet">
            <img src={tweetIcon} alt="" className="navbar-icon" />
          </button>
        </nav>
      </div>
    );
  } else {
    // else render the desktop navabar
    return (
      <div className="navbar-container">
        <nav className="vertical-navbar">
          <button className="title-logo">
            <img src="" alt="" className="navbar-icon" />
            <span className="button-text">Barker</span>
          </button>
          <div className="main-buttons">
            <Link className="link" to="home">

            <button className="home">
              <img src={homeIcon} alt="" className="navbar-icon" />
              <span className="button-text">Home</span>
            </button>
            </Link>
            <Link className="link" to="/search">
              <button className="search">
                <img src={searchIcon} alt="" className="navbar-icon" />
              </button>
            </Link>
            <button className="messages">
              <img src={messageIcon} alt="" className="navbar-icon" />
              <span className="button-text">Messages</span>
            </button>
            <button className="profile">
              <img src={userIcon} alt="" className="navbar-icon" />
              <span className="button-text">Profile</span>
            </button>
          </div>
          <button className="tweet">
            <img src={tweetIcon} alt="" className="navbar-icon" />
            <span className="button-text">Tweet</span>
          </button>

          <button className="profile">
            <img src="" alt="" className="navbar-icon" />
            <span className="button-text">Profile</span>
          </button>
        </nav>
      </div>
    );
  }
}

export default Navbar;
