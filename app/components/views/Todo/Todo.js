import "./todo.css";
import "../../../style.css";
import React, { Component } from "react";
import AddTodo from "./AddTodo";

class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          item: "go to the shop",
          checked: false
        },
        {
          item: "go to the shop",
          checked: false
        },
        {
          item: "go to the shop",
          checked: false
        }
      ],
      currentTodo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  todoRemove(todo) {
    console.log(todo.item);
    let todos = this.state.todos.filter((item, key) => {
      return key !== todo;
    });

    this.setState({
      todos: todos
    });
  }

  handleSubmit(event) {
    let todos = this.state.todos;
    let newTodos = [
      ...todos,
      {
        item: this.state.currentTodo,
        checked: false
      }
    ];

    this.setState({
      todos: newTodos
    });
    event.preventDefault();
  }

  toggleTodo(todo) {
    let toggledTodo = this.state.todos;

    todo.checked = !todo.checked;
    console.log(todo);

    let updatedTodos = this.state.todos.filter(item => {
      if (todo === item) {
        return todo;
      } else {
        return item;
      }
    });

    this.setState({
      todos: updatedTodos
    });
  }

  handleChange(event) {
    this.setState({
      currentTodo: event.target.value
    });
  }

  body() {
    return "this is a body";
  }

  render() {
    return (
      <div className="todo" key={1}>
        <h1> Todo List </h1>
        <p> Add todo: </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.currentTodo}
              onChange={this.handleChange}
            />{" "}
          </label>{" "}
          <input type="submit" value="Submit" />
        </form>
        <p> Below is a list of todo items: </p>{" "}
        <ul>
          {" "}
          {this.state.todos.map((todo, key) => {
            return (
              <span>
                <li
                  className={
                    !todo.checked ? "todo__uncrossed" : "todo__crossed"
                  }
                  onClick={this.toggleTodo.bind(this, todo)}
                  ref={li => {
                    this.item = li;
                  }}
                >
                  {todo.item}{" "}
                </li>{" "}
                <button onClick={this.todoRemove.bind(this, key)}> X </button>{" "}
              </span>
            );
          })}{" "}
        </ul>{" "}
      </div>
    );
  }
}

export default Todo;
