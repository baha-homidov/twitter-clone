import userIcon from "../assets/img/icons/user.svg";
import "../assets/css/User.css";
export default function User() {
  return (
    <div className="user-component">
      <img src={userIcon} alt="" className="user-icon" />
      <div className="profile-info">
        <div className="name">Baha Homidov</div>
        <div className="username">@bahahomidov</div>
      </div>
    </div>
  );
}
