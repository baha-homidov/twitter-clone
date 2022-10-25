import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import tweetIcon from "../assets/img/icons/tweet.svg";
import "../assets/css/Feed.css";
import Tweet from "./Tweet";

function Feed(props) {
  const [tweetArray, setTweetArray] = useState([]);
  const [userInfo, setUserInfo] = useOutletContext();

  useEffect(() => {
    const tweetArray = [];

    for (let i = 0; i < 50; i++) {
      tweetArray.push({
        name: "Alex Smith",
        username: "@alexsmith",
        text: "Lorem ipsum lorem ipsum lorem ipsum sit domet!",
      });
    }
    setTweetArray(tweetArray);
  }, []);

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
        return <Tweet retweeted={true} key={index.toString()} {...element} />;
      })}
      <Link to="/home/compose/tweet" className="tweet-link">
        <button className="tweet">
          <img src={tweetIcon} alt="" className="navbar-icon" />
        </button>
      </Link>
    </div>
  );
}

export default Feed;
