/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import WhoToFollow from "./WhoToFollow";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/App.css";
// <Outlet /> component to tell the react router where to render child components
import { Outlet } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { getUserInfo, isNewUser } from "../FirebaseBackend";
import { getAuth } from "firebase/auth";
import Loading from "./Loading";

function App() {
  const [rightBar, setRightBar] = useState(true); // control the visiblity of the rightbar
  const [showLoading, setShowLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate(); // progmatically navigate through react router
  const location = useLocation(); // get current location

  useEffect(() => {
    //redirect to /home directory if on a root location
    if (location.pathname === "/") {
      navigate("home");
    }
  }, []);

  useEffect(() => {
    setShowLoading(true);
    // listen to location change and hide the right-bar if on the "/messages location"
    let currentLocation = location.pathname;
    if (
      currentLocation.includes("messages") ||
      currentLocation.includes("conversation")
    ) {
      // if string contains a substring
      setRightBar(false);
    } else {
      if (rightBar === false) {
        setRightBar(true);
      }
    }

    onAuthStateChanged(getAuth(), async (user) => {
      // track auth state
      if (user) {
        const isNonRegisteredUser = await isNewUser(user.uid);
        if (isNonRegisteredUser) {
          navigate("/welcome/new-user-from-google");
        }
        setShowLoading(false);
        if (userInfo === null) {
          const usersnap = await getUserInfo(user.uid);
          setUserInfo(usersnap);
          console.log(usersnap);
        }
      } else {
        navigate("/welcome");
      }
    });
  }, [location]);

  return (
    <div className="app-container">
      <div className="main-content">
        <Navbar userInfo={userInfo} />

        <div className="center-content-container">
          {showLoading && <Loading />}

          {!showLoading && (
            <Outlet
              context={[userInfo, setUserInfo]}
              className="outlet-component"
            />
          )}
        </div>
      </div>

      <aside className="right-bar">
        {rightBar && (
          <div className="container">
            <SearchBar />
            <WhoToFollow />
          </div>
        )}
      </aside>
    </div>
  );
}

export default App;
