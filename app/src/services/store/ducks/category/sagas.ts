import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";

import { CategoryTypes } from "./types";
import {
  loadFailureAction,
  loadSuccessAction,
  sendFailureAction,
  sendSuccessAction,
} from "./actions";

import * as actions from "./actions";
import {
  doCreateCategory,
  doGetCategories,
  doUpdateCategory,
} from "../../../category";

export function* getUsers() {
  try {
    const response = yield call(doGetCategories);
    yield put(loadSuccessAction(response));
  } catch (err) {
    yield put(loadFailureAction(err));
  }
}

export function* createCategory({
  payload,
}: ActionType<typeof actions.createRequestAction>) {
  try {
    const { category } = payload;
    const response = yield call(doCreateCategory, category);
    yield put(sendSuccessAction(response));
  } catch (err) {
    yield put(sendFailureAction(err));
  }
}

export function* updateUser({
  payload,
}: ActionType<typeof actions.updateRequestAction>) {
  try {
    const { category } = payload;
    const response = yield call(doUpdateCategory, payload.id, category);

    yield put(sendSuccessAction(response));
  } catch (err) {
    yield put(sendFailureAction(err));
  }
}

export default all([
  takeLatest(CategoryTypes.LOAD_REQUEST, getUsers),
  takeEvery(CategoryTypes.CREATE_REQUEST, createCategory),
  takeEvery(CategoryTypes.UPDATE_REQUEST, updateUser),
]);
