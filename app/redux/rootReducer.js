import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import todos from "./reducers/todo.js";

export default combineReducers({
  todos: todos
});
