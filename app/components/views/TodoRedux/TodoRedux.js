import "./todoRedux.css";
import "../../../style.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTodo,
  removeTodo,
  fetchTodos,
  updateTodos
} from "../../../redux/actions/index.js";
import * as contentful from "contentful";

class TodoModule extends React.Component {
  constructor() {
    super();
    this.state = {
      input: { value: "a new item" }
    };
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleChange(e) {
    this.setState({
      input: { value: e.target.value }
    });
  }

  submit(e) {
    this.props.updateTodos({ value: this.state.input.value });

    e.preventDefault();
  }

  removeTodo(e) {
    this.props.onRemoveTodoClick(e);
  }

  render() {
    return (
      <div className="todo" key={1}>
        <form onSubmit={this.submit.bind(this)}>
          <input
            onChange={this.handleChange.bind(this)}
            type="text"
            value={this.state.input.value}
          />

          <input type="submit" />
        </form>
        <br />
        <ul>
          {this.props.todos.map((todo, id) => (
            <li key={id}>
              {todo.value}
              <button onClick={this.removeTodo.bind(this, id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

//redux setup

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: item => {
      dispatch(addTodo(item));
    },
    onRemoveTodoClick: id => {
      dispatch(removeTodo(id));
    },
    fetchTodos: () => {
      dispatch(fetchTodos());
    },

    updateTodos: item => {
      dispatch(updateTodos(item));
    }
  };
};

const TodoRedux = connect(mapStateToProps, mapDispatchToProps)(TodoModule);
export default TodoRedux;
