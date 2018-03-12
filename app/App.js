import React from "react";
import "./style.css";
import { Route, Link } from "react-router-dom";
import Routes from "./routes.js";
import Header from "./components/views/Header/Header.js";
import Transition from "react-transition-group/Transition";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="wrapper">
          <Routes />
        </div>
      </div>
    );
  }
}
