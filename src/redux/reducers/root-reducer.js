import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";

// Main slices of state
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
