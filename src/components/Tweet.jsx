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
  );
}

export default Tweet;
