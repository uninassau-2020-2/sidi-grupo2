import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";

import {
  loadFailureAction,
  loadSuccessAction,
  sendSuccessAction,
  sendFailureAction,
} from "./actions";

import * as actions from "./actions";

import {
  doCreateProvider,
  doGetProvider,
  doUpdateProvider,
} from "../../../provider";
import { ProviderTypes } from "./types";

export function* getProviders() {
  try {
    const response = yield call(doGetProvider);
    yield put(loadSuccessAction(response));
  } catch (err) {
    yield put(loadFailureAction(err));
  }
}

export function* createProvider({
  payload,
}: ActionType<typeof actions.createRequestAction>) {
  try {
    const { provider } = payload;
    console.log("provider", provider);
    const response = yield call(doCreateProvider, provider);
    console.log("response", response);
    yield put(sendSuccessAction(response));
  } catch (err) {
    console.log("err", err);
    yield put(sendFailureAction(err));
  }
}

export function* updateProvider({
  payload,
}: ActionType<typeof actions.updateRequestAction>) {
  try {
    const { provider } = payload;
    const response = yield call(doUpdateProvider, payload.id, provider);
    yield put(sendSuccessAction(response));
  } catch (err) {
    yield put(sendFailureAction(err));
  }
}

export default all([
  takeLatest(ProviderTypes.LOAD_REQUEST, getProviders),
  takeEvery(ProviderTypes.CREATE_REQUEST, createProvider),
  takeEvery(ProviderTypes.UPDATE_REQUEST, updateProvider),
]);
