const INIT_STATE = {
  labelList: [],
  edit: false,
  add: false,
  remove: false,
};

export const labels = (state = INIT_STATE, action) => {
  const { type, data } = action;

  switch (type) {
    case "SET_LABELS":
      return {
        ...state,
        labelList: data,
      };
    case "RESET_LABELS":
      return {
        ...state,
        labelList: data,
      };
    // case "TOGGLE_EDIT_MODAL":
    //   return {
    //     ...state,
    //     edit: !state.edit,
    //   };
    // case "TOGGLE_ADD_MODAL":
    //   return {
    //     ...state,
    //     add: !state.add,
    //   };
    // case "TOGGLE_REMOVE_MODAL":
    //   return {
    //     ...state,
    //     remove: !state.remove,
    //   };
    default:
      return state;
  }
};
