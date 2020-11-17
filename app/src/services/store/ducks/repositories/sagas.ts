import { call, put } from "redux-saga/effects";

import api from "../../../api";

import { loadSuccess, loadFailure } from "./actions";

export function* load() {
  try {
    const response = yield call(api.get, "/user");
    yield put(loadSuccess(response));
  } catch (err) {
    yield put(loadFailure());
  }
}
