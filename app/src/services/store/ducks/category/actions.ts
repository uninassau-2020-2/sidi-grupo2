import { action } from "typesafe-actions";
import { IError, CategoryRequest, Category } from "./../../../../interface";
import { CategoryTypes } from "./types";

export const loadRequestAction = () => action(CategoryTypes.LOAD_REQUEST);

export const loadSuccessAction = (data: Category[]) => {
  return action(CategoryTypes.LOAD_SUCCESS, data);
};

export const loadFailureAction = (error: IError | null = null) =>
  action(CategoryTypes.LOAD_FAILURE, error);

/**
 * Add one new category
 */
export const resetAction = () => action(CategoryTypes.RESET);

export const createRequestAction = (user: CategoryRequest) => {
  return action(CategoryTypes.CREATE_REQUEST, { user });
};

export const updateRequestAction = (user: CategoryRequest, id: number) => {
  return action(CategoryTypes.UPDATE_REQUEST, { user, id });
};

export const sendSuccessAction = (data: Category) =>
  action(CategoryTypes.SEND_SUCCESS, { data });

export const sendFailureAction = (error: IError | null = null) =>
  action(CategoryTypes.SEND_FAILURE, { error });
