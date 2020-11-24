import { ActionType } from "typesafe-actions";
import { Provider, IError } from "./../../../../interface/index";
import * as actions from "./actions";

export type ProviderAction = ActionType<typeof actions>;

/**
 * Action Types
 */
export enum ProviderTypes {
  RESET = "@povider/RESET",

  LOAD_REQUEST = "@povider/LOAD_REQUEST",
  LOAD_SUCCESS = "@povider/LOAD_SUCCESS",
  LOAD_FAILURE = "@povider/LOAD_FAILURE",

  UPDATE_REQUEST = "@povider/UPDATE_REQUEST",

  CREATE_REQUEST = "@povider/SEND_REQUEST",

  SEND_SUCCESS = "@povider/SEND_SUCCESS",
  SEND_FAILURE = "@povider/SEND_FAILURE",
}

/**
 * State types
 */
export interface ProviderState {
  readonly data: Provider[];
  readonly loading: boolean;
  readonly error: IError | null;

  readonly sendSucess: boolean;
  readonly sendError: IError | null;
}
