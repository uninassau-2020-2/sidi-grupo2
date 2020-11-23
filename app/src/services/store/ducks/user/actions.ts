import { IError, UserRequest } from "./../../../../interface/index";
import { action } from "typesafe-actions";
import { User } from "../../../../interface";
import { UserTypes } from "./types";

export const loadRequest = () => action(UserTypes.LOAD_REQUEST);

export const loadSuccess = (data: User[]) => {
  return action(UserTypes.LOAD_SUCCESS, data);
};

export const loadFailure = (error: IError | null = null) =>
  action(UserTypes.LOAD_FAILURE, error);

/**
 * Add one new user
 */
export const cleanAdd = () => action(UserTypes.ADD_CLEAN);

export const addRequestAction = (
  user: UserRequest,
  isNewUser: boolean = false
) => {
  return action(UserTypes.ADD_REQUEST, { user, isNewUser });
};

export const addSuccessAction = (data: User) =>
  action(UserTypes.ADD_SUCCESS, { data });

export const addFailureAction = (error: IError | null = null) =>
  action(UserTypes.ADD_FAILURE, { error });
