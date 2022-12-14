import "../assets/css/UserProfile.css";
import Tweet from "./Tweet";
import {
  Link,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

import { format } from "date-fns"; // library for formatting Date into human readable format
import { getAllTweets, getUserInfo, signOutUser } from "../FirebaseBackend";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { ReplyPair } from "./ReplyPair";
import FollowButton from "./FollowButton";
export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [showTweetListLoading, setShowTweetListLoading] = useState(true); // loading spinner in Tweets Replies area
  const [showProfileControl, setShowProfileControl] = useState(false);
  const [tweetArr, setTweetArr] = useState([]);
  const [currentAuthedUser, setCurrentAuthedUser] = useOutletContext();
  const navigate = useNavigate();
  const urlParam = useParams(); // access params from URL

  useEffect(() => {
    async function setUserInfoFromFirebase() {
      const usersnap = await getUserInfo(urlParam.profileId);
      setUserInfo(usersnap);
      setShowLoading(false);
    }
    setUserInfoFromFirebase();
    async function setTweetArrFromFirebase() {
      const tweetArrSnap = await getAllTweets(urlParam.profileId);

      setTweetArr(tweetArrSnap);
      setShowTweetListLoading(false);
    }
    setTweetArrFromFirebase();
  }, []);

  useEffect(() => {
    if (currentAuthedUser && userInfo) {
      setShowProfileControl(currentAuthedUser.uid === userInfo.uid);
    }
  }, [currentAuthedUser, userInfo]);

  function navigateBack() {
    navigate(-1);
  }
  return (
    <div className="user-profile-container">
      {showLoading && <Loading />}
      <Outlet context={currentAuthedUser} />
      <div className="top-bar">
        <button onClick={navigateBack} className="back">
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
          <div className="tweets-num">
            {userInfo ? userInfo.tweetCount : 0} tweets
          </div>
        </div>
      </div>
      <div className="blank-space"></div>
      <div className="user-info">
        <div className="wrapper">
          <div className="userphoto-container">
            {/* little-css trick to make a 1:1 aspect ratio */}
            <div className="dummy"></div>
            <img
              src={userInfo && userInfo.userPhotoUrl}
              alt=""
              className="userphoto"
            />
          </div>
        </div>
        <div className="name">{userInfo && userInfo.displayName}</div>
        <div className="username">{`@${userInfo && userInfo.username}`}</div>
        <div className="about-me-container">{userInfo && userInfo.aboutMe}</div>

        <div className="joined-container">
          <svg
            className="calendar"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g>
              <path
                fill="currentColor"
                d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"
              ></path>
              <circle cx="7.032" cy="8.75" r="1.285"></circle>
              <circle cx="7.032" cy="13.156" r="1.285"></circle>
              <circle cx="16.968" cy="8.75" r="1.285"></circle>
              <circle cx="16.968" cy="13.156" r="1.285"></circle>
              <circle cx="12" cy="8.75" r="1.285"></circle>
              <circle cx="12" cy="13.156" r="1.285"></circle>
              <circle cx="7.032" cy="17.486" r="1.285"></circle>
              <circle cx="12" cy="17.486" r="1.285"></circle>
            </g>
          </svg>
          {`Joined ${
            userInfo &&
            format(new Date(userInfo.timestamp.seconds * 1000), "MMMM y")
          }`}
        </div>

        <div className="follower-container">
          <Link to="followlist" state={{ active: "followers", userInfo }}>
            <div className="followers">
              <span className="number">
                {userInfo ? userInfo.followerCount : ""}
              </span>{" "}
              <span className="text">
                {userInfo && userInfo.followerCount > 1
                  ? "Followers"
                  : "Follower"}
              </span>
            </div>
          </Link>
          <Link to="followlist" state={{ active: "following", userInfo }}>
            <div className="following">
              <span className="number">
                {userInfo ? userInfo.followingCount : ""}
              </span>{" "}
              <span className="text">Following</span>
            </div>
          </Link>
        </div>
      </div>

      {showProfileControl ? (
        <div className="sign-out-container">
          <button
            onClick={() => {
              signOutUser();
              navigate("/welcome");
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        currentAuthedUser &&
        userInfo && (
          <FollowButton
            currentUserId={currentAuthedUser.uid}
            targetUserId={userInfo.uid}
          />
        )
      )}

      <div className="selection">
        <div className="text">
          Tweets & replies
          <div className="little-bar"></div>
        </div>
      </div>
      <div className="tweets-container">
        {showTweetListLoading ? (
          <Loading />
        ) : (
          <div>
            {tweetArr.map((element, index) => {
              if (element.isReply === true) {
                return (
                  <ReplyPair
                    userInfo={currentAuthedUser}
                    key={index.toString()}
                    sourceTweetInfo={element.sourceTweetData}
                    replyTweetInfo={element}
                  />
                );
              } else {
                return (
                  <Tweet
                    key={index.toString()}
                    tweetInfo={element}
                    userInfo={currentAuthedUser}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
