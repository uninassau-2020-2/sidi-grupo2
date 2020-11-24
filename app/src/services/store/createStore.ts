import { CategoryAction, CategoryState } from "./ducks/category/types";
import { createStore, applyMiddleware, Middleware, Reducer } from "redux";
import { AuthAction, AuthState } from "./ducks/auth/types";
import { UserAction, UserState } from "./ducks/user/types";
import { ProductAction, ProductState } from "./ducks/product/types";

export interface StoreState {
  auth: AuthState;
  user: UserState;
  category: CategoryState;
  product: ProductState;
}

export type StoreAction =
  | AuthAction
  | UserAction
  | CategoryAction
  | ProductAction;

export default (
  reducers: Reducer<StoreState, StoreAction>,
  middlewares: Middleware[]
) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
