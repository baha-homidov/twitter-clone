import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import "../assets/css/TweetTimeline.css";
import Tweet from "./Tweet";
import comment from "../assets/img/icons/comment.svg";
import like from "../assets/img/icons/like.svg";
import retweet from "../assets/img/icons/retweet.svg";
import arrow from "../assets/img/icons/arrow.svg";
import Loading from "./Loading";
import { getTweetDataById, publishRetweet } from "../FirebaseBackend";
import { format } from "date-fns";
import { getReplies } from "../FirebaseBackend";

function TweetTimeline(props) {
  const navigate = useNavigate();
  const [repliesTweetArray, setRepliesTweetArray] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [tweetData, setTweetData] = useState(null);
  const [userInfo, setUserInfo] = useOutletContext();

  // retweet props
  const [retweetedByInlcudes, setRetweetedByInlcudes] = useState(null);
  const [retweetCount, setRetweetCount] = useState(null);

  const params = useParams();
  useEffect(() => {
    async function initData() {
      // retrieve main tweetData from firestore
      setShowLoading(true);
      const tweet = await getTweetDataById(params.tweetId);
      setTweetData(tweet);

      // retrieve all the replies from firestore
      const repliesArray = await getReplies(tweet.tweetId);
      setRepliesTweetArray(repliesArray);
      setShowLoading(false);
    }

    initData();
  }, []);

  useEffect(() => {
    if (userInfo && tweetData) {
      // set the retweet states
      setRetweetedByInlcudes(tweetData.retweetedBy.includes(userInfo.uid));
      setRetweetCount(tweetData.retweetCount);
    }
  }, [userInfo, tweetData]);

  return (
    <div className="tweet-timeline-container">
      <Outlet />
      {showLoading && <Loading />}
      <div className="timeline-header">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="back"
        >
          <img src={arrow} alt="" />
        </button>

        <h1>Thread</h1>
      </div>
      <div className="title-tweet">
        <div className="personal-info">
          <div className="tweet-userphoto">
            <img src={tweetData ? tweetData.userPhotoUrl : ""} alt="" />
          </div>

          <div className="profile-info">
            <div
              onClick={(e) => {
                navigate(`/profile/${tweetData.authorId}`);
              }}
              className="profile-name"
            >
              {tweetData ? tweetData.displayName : ""}
            </div>
            <div className="username">
              @{tweetData ? tweetData.username : ""}
            </div>
          </div>
        </div>
        <div className="tweet-text">{tweetData ? tweetData.bodyText : ""}</div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${tweetData.tweetId}/reply`, {
                state: {
                  tweetInfo: tweetData,
                  userInfo: userInfo,
                },
              });
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
            {tweetData ? tweetData.replyCount : ""}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();

              if (
                !tweetData.retweetedBy.includes(userInfo.uid) &&
                tweetData.authorId !== userInfo.uid
              ) {
                publishRetweet(userInfo, tweetData);
                setRetweetedByInlcudes(true);
                setRetweetCount(retweetCount + 1);
              }
            }}
            className={retweetedByInlcudes ? "retweet inactive" : "retweet"}
          >
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
            {retweetCount ? retweetCount : ""}
          </button>
          <button className="like">
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
            {tweetData ? tweetData.likeCount : ""}
          </button>
        </div>
        <div className="time-container">
          {tweetData ? (
            <div className="time-content">
              <span>
                {format(new Date(tweetData.timestamp.seconds * 1000), "h:mm a")}{" "}
              </span>
              <div className="dot"></div>
              <span>
                {format(
                  new Date(tweetData.timestamp.seconds * 1000),
                  "MMM d, yyyy"
                )}{" "}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {repliesTweetArray.map((element, index) => {
        return (
          <Tweet
            key={index.toString()}
            tweetInfo={element}
            userInfo={userInfo}
          />
        );
      })}
    </div>
  );
}

export default TweetTimeline;
