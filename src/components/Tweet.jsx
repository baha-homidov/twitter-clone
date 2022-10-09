import commentIcon from "../assets/img/icons/comment.svg";
import retweetIcon from "../assets/img/icons/retweet.svg";
import likeIcon from "../assets/img/icons/like.svg";
import userPhoto from "../assets/img/icons/placeholder-userphoto.png";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import "../assets/css/Tweet.css";
function Tweet(props) {
  const redirect = useNavigate();

  function goToTweet(tweetId) {
    redirect(`/tweet/${tweetId}`);
  }
  return (
    <div className="tweet-component">
      {props.retweeted && (
        <div className="retweeted">
          <svg className="retweet-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z"
            ></path>
          </svg>
          Retweeted
        </div>
      )}
      <div
        onClick={() => {
          goToTweet("placeholder");
        }}
        className="tweet-container"
      >
        <img src={userPhoto} alt="" className="tweet-userphoto" />

        <div className="profile-info">
          <span className="profile-name">{props.name}</span>
          <span className="username">{props.username}</span>
        </div>
        <div className="tweet-text">{props.text}</div>
        <div className="action-buttons">
          <Link to="tweetId/reply" className="link">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="comment"
            >
              <div className="reply-icon">
                <img src={commentIcon} alt="" />
              </div>
              <span className="reply-num">12</span>
            </button>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="retweet"
          >
            <div className="retweet-icon">
              <img src={retweetIcon} alt="" />
            </div>
            <span className="retweet-num">12</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="like"
          >
            <div className="like-icon">
              <img src={likeIcon} alt="" />
            </div>
            <span className="like-num">12</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
