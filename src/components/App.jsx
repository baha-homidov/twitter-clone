import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import WhoToFollow from "./WhoToFollow";
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/App.css";
// <Outlet /> component to tell the react router where to render child components
import { Outlet } from "react-router-dom";
// a Hook to track if user is signed in
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getUserAuth, isNewUser } from "../FirebaseBackend";
import { getAuth } from "firebase/auth";
import Loading from "./Loading";

function App() {
  const [rightBar, setRightBar] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState("asdf");
  const loadingRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onAuthStateChanged(getAuth(), async (user) => {
      console.log("app.jsx auth check");
      if (user) {
        const isNonRegisteredUser = await isNewUser(user.uid);
        if (isNonRegisteredUser) {
          navigate("/welcome/new-user-from-google");
        }
        setShowLoading(false);
        setUserPhotoUrl(user.photoURL);
      } else {
        navigate("/welcome");
      }
    });
  }, [location]);

  window.setLoading = setShowLoading;
  window.userPhotoUrl = userPhotoUrl;
  return (
    <div className="app-container">
      <div className="main-content">
        <Navbar userPhotoUrl={userPhotoUrl} />
        {showLoading && <Loading />}
        <div className="center-content-container">
          <Outlet
            context={[userPhotoUrl, setUserPhotoUrl]}
            className="outlet-component"
          />
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
