import { action } from "typesafe-actions";
import { IError, ProductRequest, Product } from "./../../../../interface";
import { ProductTypes } from "./types";

export const loadRequestAction = () => action(ProductTypes.LOAD_REQUEST);

export const loadSuccessAction = (data: Product[]) => {
  return action(ProductTypes.LOAD_SUCCESS, data);
};

export const loadFailureAction = (error: IError | null = null) =>
  action(ProductTypes.LOAD_FAILURE, error);

/**
 * Add one new product
 */
export const resetAction = () => action(ProductTypes.RESET);

export const createRequestAction = (product: ProductRequest) => {
  return action(ProductTypes.CREATE_REQUEST, { product });
};

export const updateRequestAction = (product: ProductRequest, id: number) => {
  return action(ProductTypes.UPDATE_REQUEST, { product, id });
};

export const sendSuccessAction = (data: Product) =>
  action(ProductTypes.SEND_SUCCESS, { data });

export const sendFailureAction = (error: IError | null = null) =>
  action(ProductTypes.SEND_FAILURE, { error });
