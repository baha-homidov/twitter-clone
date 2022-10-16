import "../assets/css/ComposeTweet.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userPhoto from "../assets/img/icons/placeholder-userphoto.png";
export default function ComposeTweet(props) {
  const [value, setValue] = useState("");
  const [length, setLength] = useState(0);
  const navigate = useNavigate();
  function handleChange(event) {
    setValue(event.target.value);

    setLength(event.target.value.length);
  }

  function handleSubmit(event) {
    alert(value);
    event.preventDefault();
  }

  function navigateBack() {
    navigate(-1);
  }

  function stopBubbling(event) {
    event.stopPropagation();
  }

  useEffect(() => {
    // prevent background elements from scrolling when element mounts
    // and turn the scrolling back on when element unmounts
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
    return () => {
      document.documentElement.style.overflow = "scroll";
      document.body.scroll = "yes";
    };
  }, []);

  return (
    <div onClick={navigateBack} className="compose-tweet-container">
      <div onClick={stopBubbling} className="content">
        <div className="top-bar">
          <button onClick={navigateBack} className="back">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
              ></path>
            </svg>
          </button>

          <button form="tweet-form" type="submit" className="tweet mobile">
            Tweet
          </button>
        </div>
        {props.reply && (
          <div className="source-tweet">
            <div className="source-flex-container">
              <div className="avatar-container">
                <img src={userPhoto} alt="" />
                <div className="vertical-line"></div>
              </div>
              <div className="text-container">
                <div className="user-info">
                  <span className="name">John Smith</span>
                  <span className="username">@johnsmith</span>
                </div>
                <div className="tweet-text">
                  Lorem ipsum sit domot amen lala bla lolo Lorem ipsum sit domot
                  amen lala bla lolo
                </div>
                <div className="replying-to">
                  Replying to
                  <span className="username">@johnsmith</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex-container">
          <div className="avatar-container">
            <img src={userPhoto} alt="" />
          </div>
          <div className="input-area">
            <form
              id="tweet-form"
              className="tweet-input"
              onSubmit={handleSubmit}
            >
              <textarea
                placeholder="What's happening?"
                value={value}
                onChange={handleChange}
                className="tweet-text"
                required
                maxLength="280"
              ></textarea>

              <div className="submit-container">
                <label className="image-picker">
                  <input type="file" multiple accept="image/*" />
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="choose-image"
                  >
                    <path
                      fill="currentColor"
                      d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"
                    ></path>
                  </svg>
                </label>
                <div className="tweet-length">{length}/280</div>
                <button className="tweet desktop" type="submit">
                  Tweet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}