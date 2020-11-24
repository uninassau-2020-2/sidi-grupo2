import { CategoryState } from "./ducks/category/types";
import { createStore, applyMiddleware, Middleware, Reducer } from "redux";
import { AuthAction, AuthState } from "./ducks/auth/types";
import { UserAction, UserState } from "./ducks/user/types";

export interface StoreState {
  auth: AuthState;
  user: UserState;
  category: CategoryState;
}

export type StoreAction = AuthAction | UserAction;

export default (
  reducers: Reducer<StoreState, StoreAction>,
  middlewares: Middleware[]
) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
