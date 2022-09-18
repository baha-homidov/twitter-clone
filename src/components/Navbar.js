import React, { useState, useEffect } from "react";
import "../assets/css/Navbar.css";
function Navbar() {
  // state for tracking window and width and render the component accordingly
  const [windowWidth, setWindowWidth] = useState(0);

  function updateDimensions() {
    const width = window.innerWidth;
    setWindowWidth(width);
  }

  useEffect(() => {
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
    return (
      <div className="navbar-container">
        <nav className="horizontal-navbar">
          <button className="home">
            <img src="" alt="" className="navbar-icon" />
          </button>
          <button className="search">
            <img src="" alt="" className="navbar-icon" />
          </button>
          <button className="messages">
            <img src="" alt="" className="navbar-icon" />
          </button>
          <button className="tweet">
            <img src="" alt="" className="navbar-icon" />
          </button>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navbar-container">
        <nav className="vertical-navbar">
          <button className="title-logo">
            <img src="" alt="" className="navbar-icon" />
            <span className="button-text">Barker</span>
          </button>
          <div className="main-buttons">
            <button className="home">
              <img src="" alt="" className="navbar-icon" />
              <span className="button-text">Home</span>
            </button>
            <button className="messages">
              <img src="" alt="" className="navbar-icon" />
              <span className="button-text">Messages</span>
            </button>
            <button className="profile">
              <img src="" alt="" className="navbar-icon" />
              <span className="button-text">Profile</span>
            </button>
          </div>
          <button className="tweet">
            <img src="" alt="" className="navbar-icon" />
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
