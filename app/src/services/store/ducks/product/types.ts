import { ActionType } from "typesafe-actions";
import { Product, IError } from "./../../../../interface/index";
import * as actions from "./actions";

export type ProductAction = ActionType<typeof actions>;

/**
 * Action Types
 */
export enum ProductTypes {
  RESET = "@product/RESET",

  LOAD_REQUEST = "@product/LOAD_REQUEST",
  LOAD_SUCCESS = "@product/LOAD_SUCCESS",
  LOAD_FAILURE = "@product/LOAD_FAILURE",

  UPDATE_REQUEST = "@product/UPDATE_REQUEST",

  CREATE_REQUEST = "@product/SEND_REQUEST",

  SEND_SUCCESS = "@product/SEND_SUCCESS",
  SEND_FAILURE = "@product/SEND_FAILURE",
}

/**
 * State types
 */
export interface ProductState {
  readonly data: Product[];
  readonly loading: boolean;
  readonly error: IError | null;

  readonly sendSucess: boolean;
  readonly sendError: IError | null;
}
