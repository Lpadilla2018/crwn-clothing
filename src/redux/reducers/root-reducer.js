import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";


// Slices of state
export default combineReducers({
    user: userReducer
});
