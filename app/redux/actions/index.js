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
