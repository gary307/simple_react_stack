import * as contentful from "contentful";

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
    const client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: "hd9erw94uohu",
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken:
        "4a8f6a2ed3d021160daf946f6a87368a5c2eb76e6e217586d6bf09a1fb41f4bc"
    });

    client.getEntries("todos").then(entry => dispatch(getTodos(entry.items)));
  };
};
