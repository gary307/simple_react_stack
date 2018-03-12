import "./Header.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  render() {
    return (
      <div className="header">
        <div className="header__wrapper">
          <span>Gary Butlers react app</span>
          <div className="header__nav">
            <span>
              <Link to="/">HOME</Link>
              <Link to="/form">FORM</Link>
              <Link to="/todo">Todo</Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
