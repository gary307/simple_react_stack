import "./home.css";
import React, { Component } from "react";

class Home extends React.Component {
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
    return (
      <div className="home">
        <h1>Welcome to my react app</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          molestie risus vel hendrerit ullamcorper. Nunc nec efficitur ante.
          Maecenas non tellus vel erat consectetur porta. Sed euismod ex eu
          mauris pulvinar, quis eleifend mi venenatis. Vivamus velit mauris,
          porta vel accumsan at, consectetur sed neque. Maecenas a sapien erat.
          Ut eu scelerisque tellus, non consectetur magna. In hac habitasse
          platea dictumst. Quisque in nunc urna. Aliquam porttitor arcu rhoncus
          sem dapibus, vitae aliquet urna efficitur. Vivamus eget varius odio.
          Aliquam dignissim feugiat leo vel imperdiet. Nulla lorem eros, laoreet
          sed volutpat nec, rutrum non odio. Morbi tempor rutrum auctor. Aenean
          quis dolor ac eros molestie pretium eu in tortor. Nunc pulvinar
          sollicitudin ante, at egestas felis tincidunt placerat. Maecenas
          hendrerit ultricies consectetur. Nunc ut ex non quam mattis porta.
          Duis posuere arcu nec tellus venenatis dignissim. Vivamus ornare
          auctor urna sed ullamcorper. Mauris hendrerit felis at augue
          consectetur, id vulputate sapien tempus. Nunc bibendum nisl non
          vehicula pellentesque.
        </p>
      </div>
    );
  }
}

export default Home;
