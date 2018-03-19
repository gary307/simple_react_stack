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
    default:
      return state;
  }
};
export default todos;
