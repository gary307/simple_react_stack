const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          value: action.item.value
        }
      ];

    case "REMOVE_TODO":
      let updatedState = state.filter((item, key) => {
        return key != action.id;
      });

      return updatedState;

    case "GET_TODO":
      console.log(action.item[0].fields.todo);

      const fetchedTodos = action.item.map(item => {
        return { value: item.fields.todo };
      });

      return [...state, ...fetchedTodos];

    default:
      return state;
  }
};
export default todos;
