export const labelAction = {
  setLabels: (data) => {
    return {
      type: "SET_LABELS",
      data,
    };
  },
  resetLabels: () => {
    return {
      type: "RESET_LABELS",
      data: [],
    };
  },
  // toggleAddModal: () => {
  //   return {
  //     type: "TOGGLE_ADD_MODAL",
  //   };
  // },
  // toggleEditModal: () => {
  //   return {
  //     type: "TOGGLE_EDIT_MODAL",
  //   };
  // },
  // toggleRemoveModal: () => {
  //   return {
  //     type: "TOGGLE_REMOVE_MODAL",
  //   };
  // },
};
