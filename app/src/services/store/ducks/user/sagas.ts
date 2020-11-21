import { all, call, put, takeLatest } from "redux-saga/effects";

import { UserTypes } from "./types";
import api from "../../../api";

import { loadSuccess, loadFailure } from "./actions";

export function* getUsers() {
  try {
    const response = yield call(api.get, "/user");
    yield put(loadSuccess(response));
  } catch (err) {
    console.log("response", err);
    yield put(loadFailure());
  }
}

export default all([takeLatest(UserTypes.LOAD_REQUEST, getUsers)]);
