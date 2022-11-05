import "../assets/css/ComposeTweet.css";
import {
  Link,
  useNavigate,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import userPhoto from "../assets/img/icons/placeholder-userphoto.png";
import {
  publishReply,
  publishTweet,
  uploadTweetPhoto,
} from "../FirebaseBackend";

export default function ComposeTweet(props) {
  const [value, setValue] = useState("");
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPublished, setShowPublished] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state.userInfo;
  const sourceTweetInfo = location.state.tweetInfo
    ? location.state.tweetInfo
    : null;

  function handleChange(event) {
    setValue(event.target.value);
    setLength(event.target.value.length);
  }

  function handleImage(event) {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }

  function hidePublishedWithDelay(seconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setShowPublished(false);
        resolve();
      }, seconds * 1000);
    });
  }

  async function tweet() {
    // publish a tweet to the firestore and navigate back

    // if there is an image upload it to the firebase storage
    let imageUploadObj = {
      url: "",
      path: "",
    };

    setLoading(true);

    if (image) {
      imageUploadObj = await uploadTweetPhoto(
        image,
        userInfo.lowercaseUsername
      );
    }

    await publishTweet(
      userInfo,
      value,
      false,
      imageUploadObj.url,
      imageUploadObj.path
    );
    setShowPublished(true);
    await hidePublishedWithDelay(2);
    navigateBack();
  }

  async function reply() {
    // publish reply to in the parent tweets subcollection in firestore

    // TODO: if there is an image upload it to the firebase storage
    let imageUploadObj = {
      url: "",
      path: "",
    };

    setLoading(true);

    if (image) {
      // eslint-disable-next-line no-unused-vars
      imageUploadObj = await uploadTweetPhoto(
        image,
        userInfo.lowercaseUsername
      );
    }
    // construct a tweetInfo object
    const tweetInfo = {
      bodyText: value,
      imageStoragePath: imageUploadObj.path,
      imageUrl: imageUploadObj.url,
    };
    // setLoading(true);

    await publishReply(userInfo, tweetInfo, sourceTweetInfo);

    setShowPublished(true);
    await hidePublishedWithDelay(2);
    navigateBack();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (props.reply) {
      await reply();
    } else {
      await tweet();
    }
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
      {showPublished && (
        <div className="published-container">
          Your tweet has been published.
        </div>
      )}
      {!showPublished && (
        <div onClick={stopBubbling} className="content">
          {loading && userInfo && <div className="mask"></div>}
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
              {!loading && <span>Tweet</span>}
              {loading && (
                <div id="dots4">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </button>
          </div>
          {props.reply && (
            <div className="source-tweet">
              <div className="source-flex-container">
                <div className="avatar-container">
                  <img src={sourceTweetInfo.userPhotoUrl} alt="" />
                  <div className="vertical-line"></div>
                </div>
                <div className="text-container">
                  <div className="user-info">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${sourceTweetInfo.username}`);
                      }}
                      className="name"
                    >
                      {sourceTweetInfo.displayName}
                    </span>
                    <span className="username">
                      @{sourceTweetInfo.username}
                    </span>
                  </div>
                  <div className="tweet-text">{sourceTweetInfo.bodyText}</div>
                  <div className="replying-to">
                    Replying to
                    <span className="username">
                      @{sourceTweetInfo.username}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex-container">
            <div className="avatar-container">
              <img src={userInfo ? userInfo.userPhotoUrl : ""} alt="" />
            </div>
            <div className="input-area">
              <form
                id="tweet-form"
                className="tweet-input"
                onSubmit={handleSubmit}
              >
                {!!image && (
                  <div className="image-preview">
                    <img src={image ? URL.createObjectURL(image) : ""} alt="" />
                  </div>
                )}
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
                    <input
                      onChange={handleImage}
                      type="file"
                      multiple
                      accept="image/*"
                    />
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
                    {!loading && <span>Tweet</span>}
                    {loading && (
                      <div id="dots4">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
