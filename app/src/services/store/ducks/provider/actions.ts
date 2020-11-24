import { action } from "typesafe-actions";
import { IError, ProviderRequest, Provider } from "./../../../../interface";
import { ProviderTypes } from "./types";

export const loadRequestAction = () => action(ProviderTypes.LOAD_REQUEST);

export const loadSuccessAction = (data: Provider[]) => {
  return action(ProviderTypes.LOAD_SUCCESS, data);
};

export const loadFailureAction = (error: IError | null = null) =>
  action(ProviderTypes.LOAD_FAILURE, error);

/**
 * Add one new provider
 */
export const resetAction = () => action(ProviderTypes.RESET);

export const createRequestAction = (provider: ProviderRequest) => {
  return action(ProviderTypes.CREATE_REQUEST, { provider });
};

export const updateRequestAction = (provider: ProviderRequest, id: number) => {
  return action(ProviderTypes.UPDATE_REQUEST, { provider, id });
};

export const sendSuccessAction = (data: Provider) =>
  action(ProviderTypes.SEND_SUCCESS, { data });

export const sendFailureAction = (error: IError | null = null) =>
  action(ProviderTypes.SEND_FAILURE, { error });
