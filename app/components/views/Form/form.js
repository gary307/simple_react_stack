import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var querystring = require("querystring");
import "./Form.css";
import * as methods from "./methods";

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
      currentId: "",
      editData: { id: "0", amount: "12", month: "20", year: "2022" },
      editStatus: false
    };

    this.onClick = methods.onClick.bind(this);
    this.onEditClick = methods.onEditClick.bind(this);
    this.onGet = methods.onGet.bind(this);
    this.onDelete = methods.onDelete.bind(this);
    this.insertNewExpense = methods.insertNewExpense.bind(this);
    this.handleChange = methods.handleChange.bind(this);
    this.cancelBtn = methods.cancelBtn.bind(this);
    this.selectExpense = methods.selectExpense.bind(this);
    this.editBtn = methods.editBtn;
    this.getData = methods.getData;
    this.deleteItem = methods.deleteItem;
    this.editExpense = methods.editExpense;
  }

  componentDidMount() {
    this.onGet();
  }

  render() {
    let header = () => {
      return "this is a header";
    };
    return (
      <div
        style={{
          textAlign: "center"
        }}
        key={2}
      >
        <p>expense form(turn on mongodb to use this page) </p>
        <form
          onSubmit={this.state.editStatus ? this.onEditClick : this.onClick}
        >
          <label>
            Amount{" "}
            <input
              type="text"
              value={this.state.amount}
              onChange={this.handleChange.bind(this, "amount")}
            />{" "}
          </label>
          <label>
            Month{" "}
            <input
              type="text"
              value={this.state.month}
              onChange={this.handleChange.bind(this, "month")}
            />{" "}
          </label>
          <label>
            Year{" "}
            <input
              type="text"
              value={this.state.year}
              onChange={this.handleChange.bind(this, "year")}
            />{" "}
          </label>{" "}
          <input
            type="submit"
            value={this.state.editStatus === true ? "edit" : "Submit"}
          />
        </form>
        {this.state.editStatus ? (
          <button onClick={this.cancelBtn.bind(this)}>Cancel</button>
        ) : (
          ""
        )}
        <br />
        <br />
        <br /> {this.state.messageFromServer} <br />
        <br />{" "}
        {this.state.records.map(record => (
          <div
            className={
              record.id === this.state.currentId ? "form__selected" : ""
            }
            onClick={this.selectExpense.bind(this, record.id)}
          >
            <span className="form__data"> amount: £{record.amount} </span>{" "}
            <span className="form__data"> month: {record.month} </span>{" "}
            <span className="form__data"> year: {record.year} </span>
            {record.id === this.state.currentId ? (
              <span className="form__delete_btn">
                <button className="" onClick={this.onDelete}>
                  {" "}
                  Delete selected Expense{" "}
                </button>
                <button className="" onClick={this.editBtn.bind(this)}>
                  {" "}
                  Edit selected Expense{" "}
                </button>
              </span>
            ) : (
              ""
            )}{" "}
          </div>
        ))}{" "}
      </div>
    );
  }
}

export default form;
