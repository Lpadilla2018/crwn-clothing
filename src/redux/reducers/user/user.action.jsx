import { UserActionTypes } from "./user.types";

// function that returns an object of type and payload
export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
