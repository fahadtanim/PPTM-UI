export const clientAction = {
  setClients: (data) => {
    return {
      type: "SET_CLIENTS",
      data,
    };
  },
  resetClients: () => {
    return {
      type: "RESET_CLIENTS",
      data: [],
    };
  },
};
