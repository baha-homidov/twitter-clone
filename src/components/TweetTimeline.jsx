import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../assets/css/TweetTimeline.css";
import Tweet from "./Tweet";
import userPhoto from "../assets/img/icons/user.svg";
import comment from "../assets/img/icons/comment.svg";
import like from "../assets/img/icons/like.svg";
import retweet from "../assets/img/icons/retweet.svg";
import arrow from "../assets/img/icons/arrow.svg";

function TweetTimeline(props) {
  const tweetArray = [];

  for (let i = 0; i < 50; i++) {
    tweetArray.push({
      name: "Alex Smith",
      username: "@alexsmith",
      text: "Lorem ipsum lorem ipsum lorem ipsum sit domet!",
    });
  }

  return (
    <div className="tweet-timeline-container">
      <Outlet />
      <div className="timeline-header">
        <Link className="link" to="/home">
          <button className="back">
            <img src={arrow} alt="" />
          </button>
        </Link>
        <h1>Thread</h1>
      </div>
      <div className="title-tweet">
        <div className="personal-info">
          <img src={userPhoto} alt="" className="tweet-userphoto" />

          <div className="profile-info">
            <div className="profile-name">Alex Smith</div>
            <div className="username">@AlexSmith</div>
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
      {tweetArray.map((element, index) => {
          return <Tweet key={index.toString()} {...element} />;
        })}
    </div>
  );
}

export default TweetTimeline;
