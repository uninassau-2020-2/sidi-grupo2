import { ProductType } from "../interface";
import { ActionMap } from "../util";

export enum Types {
  Create = "CREATE_PRODUCT",
  Delete = "DELETE_PRODUCT",
  Edit = "EDIT_PRODUCT",
}

export type ShoppingCartType = {
  product: ProductType;
  amount: number;
};

type ProductPayload = {
  [Types.Create]: {
    product: ProductType;
    amount: number;
  };
  [Types.Delete]: {
    id: number;
  };
  [Types.Edit]: {
    id: number;
    amount: number;
  };
};

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<
  ProductPayload
>];

export const productReducer = (
  state: ShoppingCartType[],
  action: ProductActions
) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          product: action.payload.product,
          amount: action.payload.amount,
        },
      ];
    case Types.Delete:
      return [
        ...state.filter((product) => product.product.id !== action.payload.id),
      ];

    case Types.Edit:
      const objIndex = state.findIndex(
        (obj) => obj.product.id == action.payload.id
      );
      state[objIndex].amount = action.payload.amount;
      return state;
    default:
      return state;
  }
};
