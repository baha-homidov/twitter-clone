import commentIcon from "../assets/img/icons/comment.svg";
import retweetIcon from "../assets/img/icons/retweet.svg";
import likeIcon from "../assets/img/icons/like.svg";

function Tweet(props) {
  return (
    <div className="tweet-container">
      <div className="profile-photo"></div>
      <div className="profile-name">
        <span className="profile-name">{props.name}</span>
        <span className="usernam">{props.username}</span>
      </div>
      <div className="tweet-text">{props.text}</div>
      <div className="action-buttons">
        <button className="comment">
          <img src={commentIcon} alt="" className="tweet-icon" />
        </button>
        <button className="retweet">
          <img src={retweetIcon} alt="" className="tweet-icon" />
        </button>
        <button className="like">
          <img src={likeIcon} alt="" className="tweet-icon" />
        </button>
      </div>
    </div>
  );
}

export default Tweet;
