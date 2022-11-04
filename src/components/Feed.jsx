import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import tweetIcon from "../assets/img/icons/tweet.svg";
import "../assets/css/Feed.css";
import Tweet from "./Tweet";
import { getFollowedTweets } from "../FirebaseBackend";
import { ReplyPair } from "./ReplyPair";

function Feed(props) {
  const [tweetArray, setTweetArray] = useState([]);
  const [userInfo, setUserInfo] = useOutletContext();

  useEffect(() => {
    async function updateTweets() {
      const followedTweets = await getFollowedTweets(userInfo.uid);
      setTweetArray(followedTweets);
    }

    if (userInfo) {
      updateTweets();
    }
  }, [userInfo]);

  return (
    <div className="feed-container">
      <Outlet context={userInfo} />
      <div className="top-bar">
        <Link to={userInfo ? `/profile/${userInfo.uid}` : "#"}>
          <div className="profile-icon">
            <img
              src={userInfo && userInfo.userPhotoUrl}
              alt=""
              className="icon"
            />
          </div>
        </Link>

        <h1 className="latest-tweets">Latest Tweets</h1>
      </div>
      {tweetArray.map((element, index) => {
        if (element.isReply === true) {
          return (
            <ReplyPair
              userInfo={userInfo}
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
              userInfo={userInfo}
            />
          );
        }
      })}
      <Link
        to="/home/compose/tweet"
        state={{ userInfo: userInfo }}
        className="tweet-link"
      >
        <button className="tweet">
          <img src={tweetIcon} alt="" className="navbar-icon" />
        </button>
      </Link>
    </div>
  );
}

export default Feed;
