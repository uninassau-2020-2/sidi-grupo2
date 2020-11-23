import { IError } from "./../../../../interface/index";
import { ActionType } from "typesafe-actions";
import { User } from "../../../../interface";
import * as actions from "./actions";

export type UserAction = ActionType<typeof actions>;

/**
 * Action Types
 */
export enum UserTypes {
  LOAD_REQUEST = "@user/LOAD_REQUEST",
  LOAD_SUCCESS = "@user/LOAD_SUCCESS",
  LOAD_FAILURE = "@user/LOAD_FAILURE",

  ADD_REQUEST = "@user/ADD_REQUEST",
  ADD_SUCCESS = "@user/ADD_SUCCESS",
  ADD_FAILURE = "@user/ADD_FAILURE",
  ADD_CLEAN = "@user/ADD_CLEAN",
}

/**
 * State types
 */
export interface UserState {
  readonly data: User[];
  readonly loading: boolean;
  readonly error: IError | null;

  readonly addSucess: boolean;
  readonly addError: IError | null;
}
