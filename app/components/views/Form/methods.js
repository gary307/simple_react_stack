import axios from "axios";
var querystring = require("querystring");

export function onClick(e) {
  console.log("working");

  this.insertNewExpense(this);
  this.onGet();
}

export function onEditClick() {
  this.editExpense(this);
  this.setState({
    editExpense: false
  });
  this.onGet();
}

export function onDelete() {
  this.deleteItem(this);
  this.onGet();
}

export function onGet() {
  this.getData(this);
}

export function editBtn() {
  this.setState({
    editStatus: true
  });
}

export function cancelBtn() {
  this.setState({
    editStatus: false
  });
}

export function editExpense(e) {
  axios
    .post(
      "/edit",
      querystring.stringify({
        id: e.state.currentId,
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
      console.log("this has edited");
    });
}

export function insertNewExpense(e) {
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

export function getData(ev, year) {
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

export function editItem(e) {
  axios
    .post(
      "edit",
      querystring.stringify({
        item: this.state.editItem
      })
    )
    .then(function(response) {
      e.setState({
        messageFromServer: response.data.message
      });
    });
}

export function deleteItem(e) {
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

export function selectExpense(id) {
  this.setState({
    currentId: id
  });
}

export function handleChange(value, e) {
  if (value === "amount") {
    console.log(value);
    this.setState({
      amount: e.target.value
    });
  } else if (value === "month") {
    this.setState({
      month: e.target.value
    });
  } else if (value === "year") {
    this.setState({
      year: e.target.value
    });
  }
}
