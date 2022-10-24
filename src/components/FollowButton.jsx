import "../assets/css/FollowButton.css";
import { useState } from "react";
import { followUser } from "../FirebaseBackend";
import Loading from "./Loading";
export default function FollowButton(props) {
  const [isFollowing, setIsFollowing] = useState(false); // track if currentUser is following targetUser
  const [showLoader, setShowLoader] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        console.log("clickalo");
        setIsFollowing(!isFollowing);
      }}
      className={isFollowing ? "follow following" : "follow"}
    >
      {showLoader && (
        <div id="dots4">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {isFollowing
        ? !showLoader && (
            <div>
              <span className="hovered">Unfollow</span>
              <span className="unhovered">Following</span>
            </div>
          )
        : !showLoader && <span>Follow</span>}
    </button>
  );
}
