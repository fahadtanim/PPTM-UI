const INIT_STATE = {
  clientList: [],
};

export const clients = (state = INIT_STATE, action) => {
  const { type, data } = action;

  switch (type) {
    case "SET_CLIENTS":
      return {
        ...state,
        clientList: data,
      };
    case "RESET_CLIENTS":
      return {
        ...state,
        clientList: data,
      };
    default:
      return state;
  }
};
