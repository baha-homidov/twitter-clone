import userPhoto from "../assets/img/icons/placeholder-userphoto.png";
import "../assets/css/UserProfile.css";
import Tweet from "./Tweet";
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import userPhotoPlaceholder from "../assets/img/icons/placeholder-userphoto.png";
import { format } from "date-fns"; // library for formatting Date into human readable format
import { signOutUser } from "../FirebaseBackend";
export default function UserProfile() {
  const [userInfo, setUserInfo] = useOutletContext();
  const navigate = useNavigate();
  console.log(userInfo);
  const arr = []; // placeholder for rendering some tweets
  for (let i = 0; i < 12; i++) {
    arr.push({
      name: "Alex Smith",
      username: "@alexsmith",
      text: "Lorem ipsum lorem ipsum lorem ipsum sit domet!",
    });
  }

  function navigateBack() {
    navigate(-1);
  }
  return (
    <div className="user-profile-container">
      <Outlet context={[userInfo, setUserInfo]} />
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
              d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"
            ></path>
          </svg>
        </button>

        <div className="info-wrapper">
          <div className="name">{userInfo ? userInfo.displayName : ""}</div>
          <div className="tweets-num">12 tweets</div>
        </div>
      </div>
      <div className="blank-space"></div>
      <div className="user-info">
        <div className="wrapper">
          <div className="userphoto-container">
            <img
              src={userInfo && userInfo.userPhotoUrl}
              alt=""
              className="userphoto"
            />
          </div>
          <button className="edit-profile">Edit profile</button>
        </div>
        <div className="name">{userInfo && userInfo.displayName}</div>
        <div className="username">{`@${userInfo && userInfo.username}`}</div>
        <div className="joined-container">
          <svg
            className="calendar"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g>
              <path
                fill="currentColor"
                d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"
              ></path>
              <circle cx="7.032" cy="8.75" r="1.285"></circle>
              <circle cx="7.032" cy="13.156" r="1.285"></circle>
              <circle cx="16.968" cy="8.75" r="1.285"></circle>
              <circle cx="16.968" cy="13.156" r="1.285"></circle>
              <circle cx="12" cy="8.75" r="1.285"></circle>
              <circle cx="12" cy="13.156" r="1.285"></circle>
              <circle cx="7.032" cy="17.486" r="1.285"></circle>
              <circle cx="12" cy="17.486" r="1.285"></circle>
            </g>
          </svg>
          {`Joined ${
            userInfo &&
            format(new Date(userInfo.timestamp.seconds * 1000), "MMMM y")
          }`}
        </div>

        <div className="follower-container">
          <div className="following">
            <span className="number">28</span>{" "}
            <span className="text">Following</span>
          </div>
          <div className="followers">
            <span className="number">5</span>{" "}
            <span className="text">Followers</span>
          </div>
        </div>
      </div>
      <div className="sign-out-container">
        <button
          onClick={() => {
            signOutUser();
            navigate("/welcome");
          }}
        >
          Sign out
        </button>
      </div>
      <div className="selection">
        <div className="text">
          Tweets & replies
          <div className="little-bar"></div>
        </div>
      </div>
      <div className="tweets-container">
        {arr.map((element, index) => {
          return <Tweet key={index.toString()} {...element} />;
        })}
      </div>
    </div>
  );
}
