import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Search from "./components/Search";
import Messages from "./components/Messages";
import StartChat from "./components/StartChat";
import UserProfile from "./components/UserProfile";
import ComposeTweet from "./components/ComposeTweet";
import NotFound from "./components/NotFound";
import Welcome from "./components/Welcome";
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
import User from "./components/User";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <Feed />,
        children: [
          {
            path: "compose/tweet",
            element: <ComposeTweet />,
          },
          {
            path: ":tweetId/reply",
            element: <ComposeTweet reply={true} />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: ":tweetId/reply",
            element: <ComposeTweet reply={true} />,
          },
        ],
      },
      {
        path: "tweet/:tweetId",
        element: <TweetTimeline />,
        children: [
          {
            path: ":tweetId/reply",
            element: <ComposeTweet reply={true} />,
          },
        ],
      },
      {
        path: "search/:searchId",
        element: <Search />,
        children: [
          {
            path: ":tweetId/reply",
            element: <ComposeTweet reply={true} />,
          },
        ],
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
        path: "conversation/:conversationId",
        element: <Conversation />,
      },
      {
        path: "profile/:profileId",
        element: <UserProfile />,
        children: [
          {
            path: ":tweetId/reply",
            element: <ComposeTweet reply={true} />,
          },
        ],
      },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);

console.log("henlp");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
