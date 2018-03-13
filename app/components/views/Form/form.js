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
    this.onDelete = this.onDelete.bind(this);
    this.insertNewExpense = this.insertNewExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  onDelete(e) {
    this.deleteItem(this);
    this.onGet();
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
    axios
      .post(
        "/delete",
        querystring.stringify({
          id: e.state.currentId
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(function(response) {
        e.setState({
          messageFromServer: response.data.message
        });
      });
  }

  selectExpense(id) {
    this.setState({
      currentId: id
    });

    console.log(id);
  }

  handleChange(value, e) {
    if (value === "amount") {
      console.log(value);
      this.setState({ amount: e.target.value });
    } else if (value === "month") {
      this.setState({ month: e.target.value });
    } else if (value === "year") {
      this.setState({ year: e.target.value });
    }
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

        <form onSubmit={this.onClick}>
          <label>
            Amount
            <input
              type="text"
              value={this.state.amount}
              onChange={this.handleChange.bind(this, "amount")}
            />
          </label>

          <label>
            Month
            <input
              type="text"
              value={this.state.month}
              onChange={this.handleChange.bind(this, "month")}
            />
          </label>

          <label>
            Year
            <input
              type="text"
              value={this.state.year}
              onChange={this.handleChange.bind(this, "year")}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <button bsSize="small" onClick={this.onClick}>
          Add New Expense
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

            {record.id === this.state.currentId ? (
              <button className="form__delete_btn" onClick={this.onDelete}>
                {" "}
                Delete selected Expense
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default form;
