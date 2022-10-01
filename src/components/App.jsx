import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import WhoToFollow from "./WhoToFollow";
import {  useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/App.css";
// <Outlet /> component to tell the react router where to render child components
import { Outlet } from "react-router-dom";
function App() {


  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
    //redirect to /home directory if on a root location
    if (location.pathname === "/") {
      redirect("home");
    }
  });

  return (
    <div className="app-container">
      <div className="main-content">
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
