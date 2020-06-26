const INIT_STATE = {
  sidebarVisibility: false,
};

export const sidebar = (state = INIT_STATE, action) => {
  // console.log("Reducer ", state, action);
  if (action.type === "TOGGLE_SIDEBAR") {
    const cur = !state.sidebarVisibility;
    return {
      ...state,
      sidebarVisibility: cur,
    };
  } else {
    return state;
  }
};
