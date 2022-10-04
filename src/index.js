import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Search from "./components/Search";
import Messages from "./components/Messages";
import StartChat from "./components/StartChat";
// React Router libarary
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Feed from "./components/Feed";
import TweetTimeline from "./components/TweetTimeline";
import Conversation from "./components/Conversation";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Feed />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "tweet/:tweetId",
        element: <TweetTimeline />,
      },
      {
        path: "search/:searchId",
        element: <Search />,
      },
      {
        path: "messages",
        element: <Messages />,
        children: [
          {
            path: "startchat",
            element: <StartChat />,
          },
        ],
      },
      {
        path: "conversation/:conversationID",
        element: <Conversation />,
      },
    ],
  },
]);

console.log("henlp");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
