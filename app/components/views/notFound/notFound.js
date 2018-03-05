import React, { Component } from "react";

class notFound extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  body() {
    return "this is a body";
  }

  render() {
    let header = () => {
      return "this is a header";
    };
    return (
      <div style={{ textAlign: "center" }}>
        <h1>404</h1>
      </div>
    );
  }
}

export default notFound;
