import { useNavigate } from "react-router-dom";
import "../assets/css/WhoToFollow.css";
import User from "./User";
function WhoToFollow() {
  const navigate = useNavigate();

  const user1 = {
    uid: "Z3w0MraXa9bDD2w6kmRH5jsl9oq1",
    username: "coolDog",
    lowercaseUsername: "cooldog",
    lowercaseDisplayName: "doggo da cool",
    userPhotoUrl:
      "https://firebasestorage.googleapis.com/v0/b/twitter-clone-a252d.appspot.com/o/userphotos%2Fcooldog.jpeg?alt=media&token=0fc85717-7312-4a37-bcf9-cf3808b27ced",

    displayName: "Doggo da Cool",
  };

  const user2 = {
    displayName: "Mirzobakhtiyor Homidov",
    username: "bahaHomidov",
    followingCount: 2,
    followerCount: 1,
    lowercaseDisplayName: "mirzobakhtiyor homidov",
    lowercaseUsername: "bahahomidov",
    userPhotoUrl:
      "https://lh3.googleusercontent.com/a/ALm5wu1oFsN5ajhYZc_5Id_DkS-CQIMna8V7cOP3Cq8fqIA=s96-c",
    aboutMe: "The guy who developed this project",
    uid: "TM9ix4JrrrWy0psrSl2P67CkPhC2",
  };

  return (
    <div className="who-to-follow-container">
      <div className="title">
        <h3>Who to follow</h3>
      </div>
      <div className="user-container">
        <div
          onClick={() => {
            navigate(`/profile/${user2.uid}`);
          }}
        >
          <User userInfo={user2} />
        </div>
        <div
          onClick={() => {
            navigate(`/profile/${user1.uid}`);
          }}
        >
          <User userInfo={user1} />
        </div>
      </div>
    </div>
  );
}

export default WhoToFollow;
