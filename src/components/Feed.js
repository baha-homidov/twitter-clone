import { useEffect, useState } from "react";
import "../assets/css/Feed.css";
import Tweet from "./Tweet";

function Feed() {
  const [tweetArray, setTweetArray] = useState([]);
  useEffect(() => {
    const tweetArray = [];

    for (let i = 0; i < 5; i++) {
      tweetArray.push({
        name: "Alex Smith",
        username: "@alexsmith",
        text: "Lorem ipsum lorem ipsum lorem ipsum sit domet!"
      })
    }

    setTweetArray(tweetArray);
  },[])



  return <div className="feed-container">
    {tweetArray.map((element) => {
      return <Tweet {...element}/>
    })}
  </div>;
}

export default Feed;
