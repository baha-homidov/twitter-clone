import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Search from "./components/Search";
// React Router libarary
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Feed from "./components/Feed";
import TweetTimeline from "./components/TweetTimeline";
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
