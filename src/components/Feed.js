import { useEffect, useState } from "react";
import "../assets/css/Feed.css";
import Search from "./Search";
import Tweet from "./Tweet";

function Feed(props) {
  const [tweetArray, setTweetArray] = useState([]);
  const [showSearch, setShowSearch] = useState(true);

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

  if (props.feedShowsSearch) {
    return (
      <div className="feed-container">
        <Search initSearchValue={props.searchValue} />
      </div>
    );
  }

  return (
    <div className="feed-container">
      {tweetArray.map((element) => {
        return <Tweet {...element} />;
      })}
    </div>
  );
}

export default Feed;
