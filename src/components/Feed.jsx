import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import tweetIcon from "../assets/img/icons/tweet.svg";
import "../assets/css/Feed.css";
import Tweet from "./Tweet";

function Feed(props) {
  const [tweetArray, setTweetArray] = useState([]);

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
      <Outlet />
      <div className="top-bar">
        <div className="profile-icon">
          <img src="" alt="" className="icon" />
        </div>
        <h1 className="latest-tweets">Latest Tweets</h1>
      </div>
      {tweetArray.map((element, index) => {
        return <Tweet key={index.toString()} {...element} />;
      })}
      <Link className="tweet-link">
        <button className="tweet">
          <img src={tweetIcon} alt="" className="navbar-icon" />
        </button>
      </Link>
    </div>
  );
}

export default Feed;
