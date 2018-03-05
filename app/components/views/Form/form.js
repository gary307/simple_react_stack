import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var querystring = require("querystring");

class form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "0",
      description: "item",
      amount: "14",
      month: "16",
      year: "2020",
      messageFromServer: "awaiting",
      readData: ""
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onGet = this.onGet.bind(this);

    this.insertNewExpense = this.insertNewExpense.bind(this);
  }

  componentDidMount() {}

  handleSelectChange(e) {
    if (e.target.name == "month") {
      this.setState({
        month: e.target.value
      });
    }
    if (e.target.name == "year") {
      this.setState({
        year: e.target.value
      });
    }
  }

  onClick(e) {
    this.insertNewExpense(this);
  }

  onUpdate(e) {
    this.update(this);
  }

  onGet(e) {
    this.getData(this);
  }

  insertNewExpense(e) {
    axios
      .post(
        "/insert",
        querystring.stringify({
          desc: e.state.description,
          amount: e.state.amount,
          month: e.state.month,
          year: e.state.year
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
        console.log("this has worked");
      });
  }

  getData(ev, year) {
    axios.get("/getAll").then(function(response) {
      // ev.setState({ readData: response.data });
      console.log(res.data);
    });
  }

  update(e) {
    axios
      .post(
        "/update",
        querystring.stringify({
          _id: e.state.id,
          description: e.state.description,
          amount: e.state.amount,
          month: e.state.month,
          year: e.state.year
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
      });
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
        <button bsStyle="success" bsSize="small" onClick={this.onClick}>
          Add New Expense
        </button>

        <button bsStyle="success" bsSize="small" onClick={this.onUpdate}>
          Update New Expense
        </button>

        <button bsStyle="success" bsSize="small" onClick={this.onGet}>
          latest data
        </button>

        {this.state.messageFromServer}
      </div>
    );
  }
}

export default form;
