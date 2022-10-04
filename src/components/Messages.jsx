import { Link, Outlet } from "react-router-dom";
import User from "./User";
import userIcon from "../assets/img/icons/user.svg";
import newChatIcon from "../assets/img/icons/newchat.svg";
import newChatIconWhite from "../assets/img/icons/newchatwhite.svg";
import "../assets/css/Messages.css";
export default function Messages() {
  const conversationsArray = ["s"];

  return (
    <div className="messages-container">
      <div className="top-bar">
        <Link className="link">
          <img src={userIcon} alt="" className="profile-icon" />
        </Link>
        <h1 className="title">Messages</h1>
        <Link className="link start-chat-link" to="startchat">
          <button className="start-chat">
            <img src={newChatIcon} alt="" />
          </button>
        </Link>
      </div>
      <Link className="link start-chat-link" to="startchat">
        <button className="start-chat">
          <img src={newChatIconWhite} alt="" />
        </button>
      </Link>
      {conversationsArray.length === 0 && ( // if there are no conversations render welcome screen
        <div className="welcome-container">
          <h2 className="welcome">Welcome to your inbox!</h2>
          <div>
            Drop a line with conversations between you and others on Barker!
          </div>
          <Link to="startchat" className="link">
            <button className="write-message">Write a message</button>
          </Link>
        </div>
      )}
      {conversationsArray.length !== 0 && (
        <div className="conversations-container">
          <Link to="/conversation/id" className="link">
            <User />
          </Link>
          <Link to="/conversation/id" className="link">
            <User />
          </Link>
          <Link to="/conversation/id" className="link">
            <User />
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  );
}
