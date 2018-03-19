import "./journey.css";

import React, { Component } from "react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  render() {
    return (
      <div className="home" key={1}>
        <h1>example Journey</h1>
        <p>This is a example journey</p>
      </div>
    );
  }
}

export default Home;
