import { createClient } from "contentful-management";
// import * as contentful from "contentful-management";

var client = createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken:
    "CFPAT-92ccbdf784ddfec4f0a9d97fc00a27e55484f1989ed17b26720e770e822023da"
});

let newEntry = {};

var space = client.getSpace("hd9erw94uohu");

export const addTodo = item => ({
  type: "ADD_TODO",
  item: {
    value: item.value
  }
});

export const removeTodo = item => ({
  type: "REMOVE_TODO",
  id: item
});

const getTodos = item => ({
  type: "GET_TODO",
  item: item
});

export const fetchTodos = () => {
  return dispatch => {
    space.then(space => {
      space.getEntries("todos").then(entry => {
        console.log(entry.items);
        dispatch(getTodos(entry.items));
      });
    });
  };
};

export const updateTodos = item => {
  return dispatch => {
    space.then(space => {
      space.getEntry("5loxCLc55mCE0IIMUKMeSK").then(newTodo => {
        console.log("new todo", item);
        newTodo.fields.todo["en-GB"] = item.value;
        return space.createEntry("todos", newTodo).then(newEntry => {
          newEntry.publish();
        });
      });
    });
    dispatch(addTodo(item));
  };
};
