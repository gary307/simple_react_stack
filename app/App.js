import React from "react";
import "./style.css";
import { Route, Link } from "react-router-dom";
import Routes from "./routes.js";
import Header from "./components/views/Header/Header.js";

export default class App extends React.Component {
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
