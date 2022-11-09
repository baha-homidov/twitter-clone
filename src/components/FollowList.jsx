/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  Link,
  useOutletContext,
} from "react-router-dom";
import { getUserInfo, getFollowListUserInfo } from "../FirebaseBackend";
import "../assets/css/FollowList.css";
import Loading from "./Loading";
import User from "./User";
import FollowButton from "./FollowButton";

export default function FollowList(props) {
  const userId = useParams().profileId;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("followers"); //"followers"||"following"    state for controlling active buttons
  const [userInfo, setUserInfo] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [showFollowListLoading, setShowFollowListLoading] = useState(true);
  const [followerList, setFollowerList] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentAuthedUser, setCurrentAuthedUser] = useOutletContext(); // get authInfo passed by App.jsx

  async function initData() {
    // initialyze data from firebase
    // use Promise.all to fire two async function at the same time and wait for them to finish
    await Promise.all([initUserInfo(), getFollowListFromBackend()]);
    console.log("finish init data");
  }

  async function getFollowListFromBackend() {
    // get userData for all the followers and users followed from firestore
    // update states
    setShowFollowListLoading(true);
    const { followersUserInfoArray, followingUserInfoArray } =
      await getFollowListUserInfo(userId);
    setFollowerList(followersUserInfoArray);
    setFollowingList(followingUserInfoArray);
    setShowFollowListLoading(false);
  }

  async function initUserInfo() {
    setShowLoading(true);
    if (location.state.userInfo) {
      // if userInfo passed from parent node, don't retrieve data form backend
      setUserInfo(location.state.userInfo);
      setShowLoading(false);
      return;
    }
    const usersnap = await getUserInfo(userId);
    setUserInfo(usersnap);
    setShowLoading(false);
  }

  function initButtons() {
    // if state passed from <Link /> is valid set the active button
    if (location.state !== null) {
      setActiveButton(location.state.active);
    }
  }
  useEffect(() => {
    initButtons();
    initData();
  }, []);

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="follow-list-container">
      {<Loading /> && showLoading}
      <div className="top-bar">
        <button onClick={goBack} className="back">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"
            ></path>
          </svg>
        </button>

        <div className="info-wrapper">
          <div className="name">{userInfo ? userInfo.displayName : ""}</div>
          <div className="username">@{userInfo ? userInfo.username : ""}</div>
        </div>
      </div>
      <div className="category-buttons">
        <button
          onClick={() => {
            getFollowListFromBackend();
            setActiveButton("followers");
          }}
          className={
            activeButton === "followers" ? "followers active" : "followers"
          }
        >
          Followers <span className="blue-bar"></span>{" "}
        </button>
        <button
          onClick={() => {
            getFollowListFromBackend();
            setActiveButton("following");
          }}
          className={
            activeButton === "following" ? "following active" : "following"
          }
        >
          Following <span className="blue-bar"></span>
        </button>
      </div>
      {showFollowListLoading ? (
        <Loading />
      ) : (
        <div className="user-list-container">
          {activeButton === "followers" && (
            <div className="content">
              {followerList.map((element, index) => {
                return (
                  <Link key={index} to={`/profile/${element.uid}`}>
                    <div className="user-wrapper">
                      <User userInfo={element} />
                      {element.uid !== currentAuthedUser.uid && (
                        <FollowButton
                          currentUserId={currentAuthedUser.uid}
                          targetUserId={element.uid}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {activeButton === "following" && (
            <div className="content">
              {followingList.map((element, index) => {
                return (
                  <Link key={index} to={`/profile/${element.uid}`}>
                    <div className="user-wrapper">
                      <User userInfo={element} />

                      {element.uid !== currentAuthedUser.uid && (
                        <FollowButton
                          currentUserId={currentAuthedUser.uid}
                          targetUserId={element.uid}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
