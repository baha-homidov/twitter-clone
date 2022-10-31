import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/css/Tweet.css";
import { format } from "date-fns";

import { publishRetweet } from "../FirebaseBackend";
import { useState } from "react";
function Tweet(props) {
  const [isRetweet, setIsRetweet] = useState(props.tweetInfo.isRetweet);
  const [retweetedByInlcudes, setRetweetedByInlcudes] = useState(
    props.tweetInfo.retweetedBy.includes(props.userInfo.uid)
  );
  const [retweetCount, setRetweetCount] = useState(
    props.tweetInfo.retweetCount
  );
  const navigate = useNavigate();

  function goToTweet(tweetId) {
    console.log("tweetClick");
    navigate(`/tweet/${tweetId}`);
  }
  return (
    <div className="tweet-component">
      {isRetweet && (
        <div className={"retweeted"}>
          <svg className="retweet-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"
            ></path>
          </svg>
          {props.tweetInfo.retweeterDislayName} Retweeted
        </div>
      )}
      <div
        onClick={() => {
          goToTweet("placeholder");
        }}
        className="tweet-container"
      >
        <div className="tweet-userphoto">
          <img src={props.tweetInfo.userPhotoUrl} alt="" />
        </div>

        <div className="profile-info">
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${props.tweetInfo.authorId}`);
            }}
            className="profile-name"
          >
            {props.tweetInfo.displayName}
          </span>

          <span className="username">@{props.tweetInfo.username}</span>
          <div className="dot"></div>
          {props.tweetInfo.timestamp && (
            <div className="date">
              {format(
                new Date(props.tweetInfo.timestamp.seconds * 1000),
                "MMM d"
              )}
            </div>
          )}
        </div>

        <div className="tweet-text">
          {props.tweetInfo.imageUrl !== "" && (
            <div className="image">
              <img src={props.tweetInfo.imageUrl} alt="" />
            </div>
          )}
          {props.tweetInfo.bodyText}
        </div>
        <div className="action-buttons">
          <Link to="tweetId/reply" className="link">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="reply"
            >
              <div className="reply-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                  ></path>
                </svg>
              </div>
              <span className="reply-num">{props.tweetInfo.replyCount}</span>
            </button>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (
                !props.tweetInfo.retweetedBy.includes(props.userInfo.uid) &&
                props.tweetInfo.authorId !== props.userInfo.uid
              ) {
                publishRetweet(props.userInfo, props.tweetInfo);
                setIsRetweet(true);
                setRetweetedByInlcudes(true);
                setRetweetCount(retweetCount + 1);
              }
            }}
            className={retweetedByInlcudes ? "retweet inactive" : "retweet"}
          >
            <div className="retweet-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                ></path>
              </svg>
            </div>
            <span className="retweet-num">{retweetCount}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="like"
          >
            <div className="like-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                ></path>
              </svg>
            </div>
            <span className="like-num">{props.tweetInfo.likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
