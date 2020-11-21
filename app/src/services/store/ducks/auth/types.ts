import { ActionType } from "typesafe-actions";
import { User } from "../../../../interface";
import * as actions from "./actions";

export enum AuthTypes {
  LOAD_FAILURE = "@auth/SIGN_IN_FAILURE",
  LOAD_SUCCESS = "@auth/SIGN_IN_SUCCESS",
  LOAD_REQUEST = "@auth/SIGN_IN_REQUEST",

  LOAD_LOGOUT = "@auth/LOGOUT",
}

export interface AuthState {
  readonly loadingSignInRequest: boolean;
  readonly isSignedIn: boolean;
  readonly error: boolean;
  readonly token: string | null;
  readonly user: User | null;
}

export type AuthAction = ActionType<typeof actions>;
