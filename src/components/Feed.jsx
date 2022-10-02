import { useEffect, useState } from "react";
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

        <div className="top-bar">
            <div className="profile-icon">
              <img src="" alt="" className="icon" />
            </div>
            <h1 className="latest-tweets">Latest Tweets</h1>
          </div>
        {tweetArray.map((element, index) => {
          return <Tweet key={index.toString()} {...element} />;
        })}
      </div>
    );
  }


export default Feed;
