import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var querystring = require("querystring");
import "./Form.css";

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
      records: [""],
      currentId: ""
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onGet = this.onGet.bind(this);
    this.insertNewExpense = this.insertNewExpense.bind(this);
  }

  componentDidMount() {
    this.onGet();
  }

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
    this.onGet();
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
      let newResults = response.data.Expense.map(item => {
        let newItem = {};
        newItem.id = item._id;
        newItem.amount = item.amount;
        newItem.month = item.month;
        newItem.year = item.year;
        return newItem;
      });

      console.log(newResults);

      ev.setState({
        records: newResults
      });
    });
  }

  deleteItem(e) {
    axios.post("/delete", this.state.selectedId).then(function(response) {
      this.setState({
        messageFromServer: response.message
      });
    });
  }

  selectExpense(id) {
    this.setState({
      currentId: id
    });

    console.log(id);
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
      <div style={{ textAlign: "center" }} key={2}>
        <p>expense form (turn on mongodb to use this page)</p>
        <button bsSize="small" onClick={this.onClick}>
          Add New Expense
        </button>

        <button bsSize="small" onClick={this.onUpdate}>
          Update New Expense
        </button>

        <button onClick={this.deleteItem.bind(this)}>
          {" "}
          Delete selected Expense
        </button>
        <br />
        <br />
        {this.state.messageFromServer}
        <br />
        <br />
        {this.state.records.map(record => (
          <div
            className={
              record.id === this.state.currentId ? "form__selected" : ""
            }
            onClick={this.selectExpense.bind(this, record.id)}
          >
            <span className="form__data">amount:£{record.amount} </span>
            <span className="form__data">month:{record.month} </span>
            <span className="form__data">year:{record.year}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default form;
