import { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import "../assets/css/Feed.css";
import Tweet from "./Tweet";
import { getFollowedTweets } from "../FirebaseBackend";
import { ReplyPair } from "./ReplyPair";
import Loading from "./Loading";

function Feed(props) {
  const [tweetArray, setTweetArray] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useOutletContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function updateTweets() {
      setLoading(true);
      const followedTweets = await getFollowedTweets(userInfo.uid);
      setTweetArray(followedTweets);
      setLoading(false);
    }

    if (userInfo) {
      updateTweets();
    }
  }, [userInfo]);

  return (
    <div className="feed-container">
      {loading && <Loading />}
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
          <svg viewBox="0 0 24 24">
            <g>
              <path
                fill="currentColor"
                d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
              ></path>
            </g>
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default Feed;
