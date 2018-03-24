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
      const fetchedTodos = action.item.map(item => {
        console.log(item.fields.todo["en-GB"]);
        return {
          value: item.fields.todo["en-GB"]
        };
      });

      return [...state, ...fetchedTodos];

    default:
      return state;
  }
};
export default todos;
