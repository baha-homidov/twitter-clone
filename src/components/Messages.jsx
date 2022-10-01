import { Link } from "react-router-dom";

export default function Messages() {
  return (
    <div className="messages-container">
      <div className="top-bar">
        <h1 className="title">Messages</h1>
        <Link className="link">
          <div className="profile-icon"></div>
        </Link>
      </div>
      <div className="welcome-container">
        <h2 className="welcome">Welcome to your inbox!</h2>
        <div>
          Drop a line with conversations between you and others on Barker!
        </div>
        <button className="write-message">Write a message</button>
      </div>
    </div>
  );
}
