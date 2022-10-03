import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "./User";
import "../assets/css/StartChat.css";

export default function StartChat() {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    alert(value);
    event.preventDefault();
  }
  return (
    <div className="start-chat-container">
      <div className="content">
        <div className="top-bar">
          <Link to="/messages" className="link">
            <button className="back">
              <svg className="back-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
                />
              </svg>
            </button>
          </Link>
          <h1 className="title">New Message</h1>
        </div>

        <form className="search-form" onSubmit={handleSubmit}>
          <svg className="search-icon" viewBox="0 0 20 20">
            <path d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"></path>
          </svg>
          <input type="text" value={value} onChange={handleChange} />
        </form>
        <div className="result-list">
          <User />
        </div>
      </div>
    </div>
  );
}
