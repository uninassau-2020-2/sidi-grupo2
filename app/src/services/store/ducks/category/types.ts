import { ActionType } from "typesafe-actions";
import { Category, IError } from "./../../../../interface/index";
import * as actions from "./actions";

export type CategoryAction = ActionType<typeof actions>;

/**
 * Action Types
 */
export enum CategoryTypes {
  RESET = "@category/RESET",

  LOAD_REQUEST = "@category/LOAD_REQUEST",
  LOAD_SUCCESS = "@category/LOAD_SUCCESS",
  LOAD_FAILURE = "@category/LOAD_FAILURE",

  UPDATE_REQUEST = "@category/UPDATE_REQUEST",

  CREATE_REQUEST = "@category/SEND_REQUEST",

  SEND_SUCCESS = "@category/SEND_SUCCESS",
  SEND_FAILURE = "@category/SEND_FAILURE",
}

/**
 * State types
 */
export interface CategoryState {
  readonly data: Category[];
  readonly loading: boolean;
  readonly error: IError | null;

  readonly sendSucess: boolean;
  readonly sendError: IError | null;
}
