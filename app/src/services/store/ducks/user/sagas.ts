import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";

import { UserTypes } from "./types";
import api from "../../../api";

import {
  loadSuccess,
  loadFailure,
  addSuccessAction,
  addFailureAction,
} from "./actions";
import * as actions from "./actions";
import { User } from "../../../../interface";

export function* getUsers() {
  try {
    const response = yield call(api.get, "/user");
    yield put(loadSuccess(response));
  } catch (err) {
    yield put(loadFailure(err));
  }
}

export function* addUser({
  payload,
}: ActionType<typeof actions.addRequestAction>) {
  try {
    const { user } = payload;
    const response = yield call(api.post, "/user", user);
    yield put(addSuccessAction(response));
  } catch (err) {
    yield put(addFailureAction(err));
  }
}

export function* updateUser({
  payload,
}: ActionType<typeof actions.updateUserAction>) {
  try {
    const { user } = payload;
    const response = yield call(api.patch, `/user/${payload.id}`, user);

    console.log("response", response);
    yield put(addSuccessAction(response));
  } catch (err) {
    yield put(addFailureAction(err));
  }
}

export default all([
  takeLatest(UserTypes.LOAD_REQUEST, getUsers),
  takeLatest(UserTypes.UPDATE_REQUEST, updateUser),
  takeEvery(UserTypes.ADD_REQUEST, addUser),
]);
