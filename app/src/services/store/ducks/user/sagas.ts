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
    const response = payload.isNewUser
      ? yield call(api.post, "/user", user)
      : yield call(api.patch, "/user", user);
    yield put(addSuccessAction(response));
  } catch (err) {
    yield put(addFailureAction(err));
  }
}

export default all([
  takeLatest(UserTypes.LOAD_REQUEST, getUsers),
  takeEvery(UserTypes.ADD_REQUEST, addUser),
]);
