import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/Navbar.css";
import messageIcon from "../assets/img/icons/message.svg";
import homeIcon from "../assets/img/icons/home.svg";
import tweetIcon from "../assets/img/icons/tweet.svg";
import userIcon from "../assets/img/icons/user.svg";
import searchIcon from "../assets/img/icons/search.svg";
import logoIcon from "../assets/img/icons/icon-small.png";
import userPhotoPlaceholder from "../assets/img/icons/placeholder-userphoto.png";
import { signOutUser } from "../FirebaseBackend";
function Navbar(props) {
  // state for tracking window and width and render the component accordingly
  const [windowWidth, setWindowWidth] = useState(0); // track window width for implementing responsive design
  const location = useLocation(); // progmatically navigate through react router
  const navigate = useNavigate(); // get current location
  const [currentActiveButton, setCurrentActiveButton] = useState("home"); // track active button for highlighting them

  // control userPop's open-closed state
  const [openPopUp, setOpenPopUp] = useState(false);
  const popUpRef = useRef(null);

  // refs for css manipulation
  const homeButtonActive = useRef("active");
  const searchButtonActive = useRef("");
  const messagesButtonActive = useRef("");
  const profileButtonActive = useRef("");

  function showPopUp() {
    const popUp = popUpRef.current;
    popUp.className = "pop-up-container show";
    setOpenPopUp(true);
  }

  function hidePopUp(event) {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      popUpRef.current.className = "pop-up-container";
      if (openPopUp === true) {
        setOpenPopUp(false);
      }
    }
  }

  // trigger active button's styling
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

    document.addEventListener("mousedown", hidePopUp);

    // equivalent of componentDidUnmount
    // release recources
    return () => {
      window.removeEventListener("resize", updateDimensions);
      document.removeEventListener("mousedown", hidePopUp);
    };
  }, []);

  useEffect(() => {
    // listen to location changes and set the active button
    updateActiveButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function updateActiveButton() {
    // determine pressed button by checking DOM's elements name
    // one function for all <Navbar /> buttons
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
    // mini object to control reponsive design display
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

          <div className="link profile-link">
            <button onClick={showPopUp} className="profile bottom">
              <div ref={popUpRef} className={`pop-up-container`}>
                <div
                  onClick={() => {
                    signOutUser();
                    navigate("/welcome");
                  }}
                  className="sign-out"
                >
                  Log out @bahahomidov
                </div>
              </div>
              <img
                src={
                  props.userInfo
                    ? props.userInfo.userPhotoUrl
                    : userPhotoPlaceholder
                }
                alt=""
                className="navbar-icon"
              />
              <div className="profile-info">
                <div className="name">Baha Homidov</div>
                <div className="username">@bahahomidov</div>
              </div>
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
