import "../assets/css/WhoToFollow.css";
import User from "./User";
function WhoToFollow(props) {
  return (
    <div className="who-to-follow-container">
      <div className="title">
        <h3>Who to follow</h3>
      </div>
      <div className="user-container">
        <User />
        <User />
      </div>
    </div>
  );
}

export default WhoToFollow;
