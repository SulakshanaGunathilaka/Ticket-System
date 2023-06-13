import { combineReducers } from "redux";
import reducer from "./ticketReducer";

export default combineReducers({
 
  fieldData: reducer,
});