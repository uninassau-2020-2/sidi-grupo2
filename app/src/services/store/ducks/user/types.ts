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
}

/**
 * State types
 */
export interface UserState {
  readonly data: User[];
  readonly loading: boolean;
  readonly error: boolean;
}
