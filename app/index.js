import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import {
  HashHistory,
  BrowserHistory,
  BrowserRouter,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter history={HashHistory}>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
