import { combineReducers } from "redux";
import { sidebar } from "./SidebarReducer";
import { labels } from "./LabelReducer";
import { clients } from "./ClientsReducer";

// const INIT_STATE = {
//   sidebarVisibility: false,
// };

// export const Reducer = (state = INIT_STATE, action) => {
//   // console.log("Reducer ", state, action);
//   if (action.type === "TOGGLE_SIDEBAR") {
//     const cur = !state.sidebarVisibility;
//     return {
//       ...state,
//       sidebarVisibility: cur,
//     };
//   } else {
//     return state;
//   }
// };

export default combineReducers({
  sidebar,
  labels,
  clients,
});
