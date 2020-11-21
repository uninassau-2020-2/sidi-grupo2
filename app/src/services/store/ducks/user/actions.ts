import { action } from "typesafe-actions";
import { User } from "../../../../interface";
import { UserTypes } from "./types";

export const loadRequest = () => action(UserTypes.LOAD_REQUEST);

export const loadSuccess = (data: User[]) => {
  return action(UserTypes.LOAD_SUCCESS, data);
};

export const loadFailure = () => action(UserTypes.LOAD_FAILURE);
