import "../assets/css/User.css";
export default function User(props) {
  return (
    <div className="user-component">
      <img
        referrerPolicy="no-referrer"
        src={props.userInfo ? props.userInfo.userPhotoUrl : ""}
        alt=""
        className="user-icon"
      />
      <div className="profile-info">
        <div className="name">
          {props.userInfo ? props.userInfo.displayName : ""}
        </div>
        <div className="username">
          @{props.userInfo ? props.userInfo.username : ""}
        </div>
      </div>
    </div>
  );
}
