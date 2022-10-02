import React, { useState } from "react";
import { Link } from "react-router-dom";
import User from "./User";
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
      <div className="top-bar">
        <Link to="/messages" className="link">
          <button className="back">x</button>
        </Link>
        <h1 className="title">New Message</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="result-list">
        <User />
      </div>
    </div>
  );
}
