import "../assets/css/FollowButton.css";
import { useEffect, useState } from "react";
import { unfollowUser, followUser, isFollowing } from "../FirebaseBackend";
export default function FollowButton(props) {
  const [currentFollowingTarget, setCurrentFollowingTarget] = useState(false); // track if currentUser is following targetUser
  const [showLoader, setShowLoader] = useState(false);

  async function followAction() {
    setShowLoader(true);
    // follows or unfollows the targetUser depending on currentFollowingTarget state
    if (currentFollowingTarget === true) {
      console.log("unfollow action");
      await unfollowUser(props.currentUserId, props.targetUserId);
    } else {
      console.log("follow action");
      await followUser(props.currentUserId, props.targetUserId);
    }
    setShowLoader(false);
    setCurrentFollowingTarget(!currentFollowingTarget);
  }

  useEffect(() => {
    const initButton = async () => {
      setShowLoader(true);
      const result = await isFollowing(props.currentUserId, props.targetUserId);
      setShowLoader(false);
      console.log(result);
      setCurrentFollowingTarget(result);
    };

    initButton();
  }, []);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        followAction();
      }}
      className={currentFollowingTarget ? "follow following" : "follow"}
    >
      {showLoader && (
        <div id="dots4">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {currentFollowingTarget
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
