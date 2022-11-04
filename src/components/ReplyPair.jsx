import Tweet from "./Tweet";
import "../assets/css/ReplyPair.css";

export function ReplyPair(props) {

  

  return (
    <div className="reply-pair-container">
      <div className="source-tweet">
        <Tweet userInfo={props.userInfo} tweetInfo={props.sourceTweetInfo} />
        <div className="reply-line"></div>
      </div>
      <Tweet userInfo={props.userInfo} tweetInfo={props.replyTweetInfo} />
    </div>
  );
}
