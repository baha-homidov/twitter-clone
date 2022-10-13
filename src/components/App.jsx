import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import WhoToFollow from "./WhoToFollow";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/App.css";
// <Outlet /> component to tell the react router where to render child components
import { Outlet } from "react-router-dom";
// a Hook to track if user is signed in
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getUserAuth } from "../FirebaseBackend";
import { getAuth } from "firebase/auth";
import Loading from "./Loading";

function App() {
  const [rightBar, setRightBar] = useState(true);
  const [loading, setLoading] = useState(true);
  const redirect = useNavigate();
  const location = useLocation();
  let userPhotoUrl = "";

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setLoading(false);
      userPhotoUrl = user.photoURL;
    } else {
      redirect("/welcome");
    }
  });

  useEffect(() => {
    //redirect to /home directory if on a root location
    if (location.pathname === "/") {
      redirect("home");
    }
  });

  //   console.log(getUserAuth().currentUser);
  //   if (!getUserAuth().currentUser) {
  //     redirect("/welcome");
  //   }
  useEffect(() => {}, []);

  useEffect(() => {
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
  }, [location]);

  return loading ? ( // conditional rendering
    <Loading />
  ) : (
    <div className="app-container">
      <div className="main-content">
        <Navbar />

        <div className="center-content-container">
          <Outlet className="outlet-component" />
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
