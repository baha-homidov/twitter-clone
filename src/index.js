import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Search from "./components/Search";

import UserProfile from "./components/UserProfile";
import ComposeTweet from "./components/ComposeTweet";
import NotFound from "./components/NotFound";
import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

// React Router libarary
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./components/Feed";
import TweetTimeline from "./components/TweetTimeline";

import CreateUserFromGoogle from "./components/CreateUserFromGoogle";
import FollowList from "./components/FollowList";

window.version = "0.3.1";

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
        path: "profile/:profileId/followlist",
        element: <FollowList />,
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
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "new-user-from-google",
        element: <CreateUserFromGoogle />,
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
