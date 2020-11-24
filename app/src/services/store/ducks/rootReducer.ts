import { combineReducers } from "redux";

import { StoreState } from "../createStore";

import auth from "./auth/";
import user from "./user/";
import category from "./category/";
import product from "./product/";
import provider from "./provider/";

export default combineReducers<StoreState>({
  auth,
  user,
  category,
  product,
  provider,
});
