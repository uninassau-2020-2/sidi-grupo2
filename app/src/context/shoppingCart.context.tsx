import React, { createContext, useReducer, Dispatch } from "react";
import {
  productReducer,
  ProductActions,
  ShoppingCartType,
} from "../reducer/ShoppingCartReducer";

type InitialStateType = {
  products: ShoppingCartType[];
};

const initialState = {
  products: [],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { products }: InitialStateType,
  action: ProductActions
) => ({
  products: productReducer(products, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
