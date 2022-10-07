import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/Navbar.css";
import messageIcon from "../assets/img/icons/message.svg";
import homeIcon from "../assets/img/icons/home.svg";
import tweetIcon from "../assets/img/icons/tweet.svg";
import userIcon from "../assets/img/icons/user.svg";
import searchIcon from "../assets/img/icons/search.svg";
import logoIcon from "../assets/img/icons/icon-small.png";

function Navbar(props) {
  // state for tracking window and width and render the component accordingly
  const [windowWidth, setWindowWidth] = useState(0);
  const location = useLocation();

  const [currentActiveButton, setCurrentActiveButton] = useState("home");
  const homeButtonActive = useRef("active");
  const searchButtonActive = useRef("");
  const messagesButtonActive = useRef("");
  const profileButtonActive = useRef("");
  function setActive(event) {
    homeButtonActive.current = "";
    searchButtonActive.current = "";
    messagesButtonActive.current = "";
    profileButtonActive.current = "";

    let targetElement = event.target.className;
    targetElement = targetElement.substring(0, targetElement.indexOf(" ")); // Split string on the first white space occurrence
    switch (targetElement) {
      case "home":
        homeButtonActive.current = "active";
        break;
      case "search":
        searchButtonActive.current = "active";
        break;
      case "messages":
        messagesButtonActive.current = "active";
        break;
      case "profile":
        profileButtonActive.current = "active";
        break;
      default:
        console.log("failure!");
        break;
    }
  }

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

  useEffect(() => {
    // listen to location changes and set the active button
    updateActiveButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function updateActiveButton() {
    let currentLocation = location.pathname;

    homeButtonActive.current = "";
    searchButtonActive.current = "";
    messagesButtonActive.current = "";
    profileButtonActive.current = "";
    switch (true) {
      case currentLocation.includes("home"):
        homeButtonActive.current = "active";
        break;
      case currentLocation.includes("search"):
        searchButtonActive.current = "active";
        break;
      case currentLocation.includes("messages"):
        messagesButtonActive.current = "active";
        break;
      case currentLocation.includes("profile"):
        profileButtonActive.current = "active";
        break;

      default:
        break;
    }
    setCurrentActiveButton(currentLocation);
  }

  const responsive = {
    showMobileNavBar: windowWidth < 480,
  };

  if (responsive.showMobileNavBar) {
    //if the width is narrow render mobile navbar

    // in the case of the user navigetes to the /search path through the right bat
    // set search button to active
    if (location.pathname === "/search") {
      homeButtonActive.current = "";
      searchButtonActive.current = "active";
      messagesButtonActive.current = "";
      profileButtonActive.current = "";
    }

    return (
      <div className="navbar-container">
        <nav className="horizontal-navbar">
          <Link className="link" to="home">
            <button
              onClick={setActive}
              className={`home ${homeButtonActive.current}`}
            >
              <img src={homeIcon} alt="" className="navbar-icon" />
              <div className="active-bar"></div>
            </button>
          </Link>
          <Link className="link" to="/search">
            <button
              onClick={setActive}
              className={`search ${searchButtonActive.current}`}
            >
              <img src={searchIcon} alt="" className="navbar-icon" />
              <div className="active-bar"></div>
            </button>
          </Link>
          <Link to="/messages" className="link">
            <button
              onClick={setActive}
              className={`messages ${messagesButtonActive.current}`}
            >
              <img src={messageIcon} alt="" className="navbar-icon" />
              <div className="active-bar"></div>
            </button>
          </Link>
          
        </nav>
      </div>
    );
  } else {
    if (location.pathname === "/home") {
      homeButtonActive.current = "active";
      searchButtonActive.current = "";
      messagesButtonActive.current = "";
      profileButtonActive.current = "";
    }
    // else render the desktop navabar
    return (
      <div className="navbar-container">
        <nav className="vertical-navbar">
          <button className="title-logo">
            <img src={logoIcon} alt="" className="navbar-icon" />
          </button>
          <div className="main-buttons">
            <Link className="link" to="home">
              <button
                onClick={setActive}
                className={`home ${homeButtonActive.current}`}
              >
                <img src={homeIcon} alt="" />
                <span className="button-text">Home</span>
              </button>
            </Link>

            <Link className="link search-link" to="/search">
              <button
                onClick={setActive}
                className={`search ${searchButtonActive.current}`}
              >
                <img src={searchIcon} alt="" className="navbar-icon" />
              </button>
            </Link>
            <Link to="/messages" className="link">
              <button
                onClick={setActive}
                className={`messages ${messagesButtonActive.current}`}
              >
                <img src={messageIcon} alt="" className="navbar-icon" />
                <span className="button-text">Messages</span>
              </button>
            </Link>

            <Link to="/profile/123" className="link">
              <button
                onClick={setActive}
                className={`profile ${profileButtonActive.current}`}
              >
                <img src={userIcon} alt="" className="navbar-icon" />
                <span className="button-text">Profile</span>
              </button>
            </Link>
          </div>
          <Link to="/home/compose/tweet" className="link tweet-link">
            <button className="tweet">
              <img src={tweetIcon} alt="" className="navbar-icon" />
              <span className="button-text">Tweet</span>
            </button>
          </Link>

          <Link className="link profile-link">
            <button className="profile">
              <img src={userIcon} alt="" className="navbar-icon" />
              <div className="profile-info">
                <div className="name">Baha Homidov</div>
                <div className="username">@bahahomidov</div>
              </div>
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
