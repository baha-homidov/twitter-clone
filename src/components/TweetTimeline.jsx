import { useEffect, useState } from "react";
import "../assets/css/TweetTimeline.css";
import Tweet from "./Tweet";
import userPhoto from "../assets/img/icons/user.svg";
import comment from "../assets/img/icons/comment.svg";
import like from "../assets/img/icons/like.svg";
import retweet from "../assets/img/icons/retweet.svg";

function TweetTimeline(props) {
  return (
    <div className="tweet-timeline-container">
      <div className="title-tweet">
        <div className="personal-info">
          <div className="profile-photo">
            <img src={userPhoto} alt="" className="tweet-userphoto" />
          </div>
          <div className="profile-info">
            <div className="profile-name">{props.name}</div>
            <div className="username">{props.username}</div>
          </div>
        </div>
        <div className="tweet-text">
          Lorem ipsum si omo lorem damet posum, tuta tama lora poco macarono
        </div>
        <div className="buttons">
          <button className="reply">
            <img src={comment} alt="" />
            12
          </button>
          <button className="retweet">
            <img src={retweet} alt="" />
            12
          </button>
          <button className="like">
            <img src={like} alt="" />
            12
          </button>
        </div>
      </div>
    </div>
  );
}

export default TweetTimeline;
