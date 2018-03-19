import React from "react";
import "./style.css";
import { Route, Link } from "react-router-dom";
import Routes from "./routes.js";
import Header from "./components/views/Header/Header.js";
import Transition from "react-transition-group/Transition";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"; // ES6
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./redux/rootReducer.js";
import todos from "./redux/reducers/todo.js";
import thunk from "redux-thunk";

const initialState = {
  todos: [{ id: 0, value: "a todo item" }]
};

let store = createStore(todos);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider
        store={createStore(
          rootReducers,
          initialState,
          applyMiddleware(thunk),
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <div className="app">
          <Header />
          <div className="wrapper">
            <Routes />
          </div>
        </div>
      </Provider>
    );
  }
}
