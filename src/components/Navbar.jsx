/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/Navbar.css";
import logoIcon from "../assets/img/icons/icon-small.png";
import { signOutUser } from "../FirebaseBackend";

function Navbar(props) {
  // state for tracking window and width and render the component accordingly
  const [windowWidth, setWindowWidth] = useState(0); // track window width for implementing responsive design
  const location = useLocation(); // progmatically navigate through react router
  const navigate = useNavigate(); // get current location
  // const [currentActiveButton, setCurrentActiveButton] = useState("home"); // track active button for highlighting them

  // control userPop's open-closed state
  const [openPopUp, setOpenPopUp] = useState(false);
  const popUpRef = useRef(null);

  // refs for css manipulation
  const homeButtonActive = useRef("active");
  const searchButtonActive = useRef("");
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

    profileButtonActive.current = "";
    switch (true) {
      case currentLocation.includes("home"):
        homeButtonActive.current = "active";
        break;
      case currentLocation.includes("search"):
        searchButtonActive.current = "active";
        break;

      case currentLocation.includes("profile"):
        profileButtonActive.current = "active";
        break;

      default:
        break;
    }
    // setCurrentActiveButton(currentLocation);
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

      profileButtonActive.current = "";
    }

    return (
      <div className="navbar-container">
        <nav
          style={{ pointerEvents: props.userInfo ? "all" : "none" }}
          className="horizontal-navbar"
        >
          <Link className="link" to="home">
            <button
              onClick={setActive}
              className={`home ${homeButtonActive.current}`}
            >
              <svg viewBox="0 0 24 24">
                <g>
                  <path
                    fill="currentColor"
                    d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"
                  ></path>
                </g>
              </svg>
              <div className="active-bar"></div>
            </button>
          </Link>
          <Link className="link" to="/search">
            <button
              onClick={setActive}
              className={`search ${searchButtonActive.current}`}
            >
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
              <div className="active-bar"></div>
            </button>
          </Link>
          <Link
            to={props.userInfo ? `/profile/${props.userInfo.uid}` : "#"}
            className="link"
          >
            <button
              onClick={setActive}
              className={`profile ${profileButtonActive.current}`}
            >
              <svg viewBox="0 0 24 24">
                <g>
                  <g>
                    <path
                      fill="currentColor"
                      d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"
                    ></path>
                  </g>
                </g>
              </svg>
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

      profileButtonActive.current = "";
    }
    // else render the desktop navabar
    return (
      <div className="navbar-container">
        <nav
          style={{ pointerEvents: props.userInfo ? "all" : "none" }}
          className="vertical-navbar"
        >
          <Link to="/home">
            <button className="title-logo">
              <img src={logoIcon} alt="" className="navbar-icon" />
            </button>
          </Link>
          <div className="main-buttons">
            <Link className="link" to="home">
              <button
                onClick={setActive}
                className={`home ${homeButtonActive.current}`}
              >
                <svg viewBox="0 0 24 24">
                  <g>
                    <path
                      fill="currentColor"
                      d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"
                    ></path>
                  </g>
                </svg>
                {/* <img src={homeIcon} alt="" /> */}
                <span className="button-text">Home</span>
              </button>
            </Link>

            <Link className="link search-link" to="/search">
              <button
                onClick={setActive}
                className={`search ${searchButtonActive.current}`}
              >
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
            </Link>

            <Link
              to={props.userInfo ? `/profile/${props.userInfo.uid}` : "#"}
              className="link"
            >
              <button
                onClick={setActive}
                className={`profile ${profileButtonActive.current}`}
              >
                <svg viewBox="0 0 24 24">
                  <g>
                    <g>
                      <path
                        fill="currentColor"
                        d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span className="button-text">Profile</span>
              </button>
            </Link>
          </div>
          <Link
            to="/home/compose/tweet"
            state={{ userInfo: props.userInfo }}
            className="link tweet-link"
          >
            <button className="tweet">
              <svg viewBox="0 0 24 24">
                <g>
                  <path
                    fill="currentColor"
                    d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
                  ></path>
                </g>
              </svg>
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
                  Log out @{props.userInfo && props.userInfo.username}
                </div>
              </div>
              <img
                referrerPolicy="no-referrer"
                src={props.userInfo ? props.userInfo.userPhotoUrl : ""}
                alt=""
                className="navbar-icon"
              />
              <div className="profile-info">
                <div className="name">
                  {props.userInfo && props.userInfo.displayName}
                </div>
                <div className="username">
                  @{props.userInfo && props.userInfo.username}
                </div>
              </div>
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
