import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";

import { ProductTypes } from "./types";
import {
  loadFailureAction,
  loadSuccessAction,
  sendSuccessAction,
  sendFailureAction,
} from "./actions";

import * as actions from "./actions";

import {
  doCreateProduct,
  doGetProducts,
  doUpdateProduct,
} from "../../../produtct";

export function* getUsers() {
  try {
    const response = yield call(doGetProducts);
    yield put(loadSuccessAction(response));
  } catch (err) {
    yield put(loadFailureAction(err));
  }
}

export function* createCategory({
  payload,
}: ActionType<typeof actions.createRequestAction>) {
  try {
    const { product } = payload;
    const response = yield call(doCreateProduct, product);
    yield put(sendSuccessAction(response));
  } catch (err) {
    yield put(loadFailureAction(err));
  }
}

export function* updateUser({
  payload,
}: ActionType<typeof actions.updateRequestAction>) {
  try {
    const { product } = payload;
    const response = yield call(doUpdateProduct, payload.id, product);
    yield put(sendSuccessAction(response));
  } catch (err) {
    yield put(sendFailureAction(err));
  }
}

export default all([
  takeLatest(ProductTypes.LOAD_REQUEST, getUsers),
  takeEvery(ProductTypes.CREATE_REQUEST, createCategory),
  takeEvery(ProductTypes.UPDATE_REQUEST, updateUser),
]);
