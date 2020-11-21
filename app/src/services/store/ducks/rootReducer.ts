import { combineReducers } from "redux";

import { StoreState } from "../createStore";

import auth from "./auth/";
import user from "./user/";

export default combineReducers<StoreState>({
  auth,
  user,
});
