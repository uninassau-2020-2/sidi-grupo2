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
} from "../../../product";

export function* getProducts() {
  try {
    const response = yield call(doGetProducts);
    yield put(loadSuccessAction(response));
  } catch (err) {
    yield put(loadFailureAction(err));
  }
}

export function* createProduct({
  payload,
}: ActionType<typeof actions.createRequestAction>) {
  try {
    const { product } = payload;
    const response = yield call(doCreateProduct, product);
    yield put(sendSuccessAction(response));
  } catch (err) {
    yield put(sendFailureAction(err));
  }
}

export function* updateProduct({
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
  takeLatest(ProductTypes.LOAD_REQUEST, getProducts),
  takeEvery(ProductTypes.CREATE_REQUEST, createProduct),
  takeEvery(ProductTypes.UPDATE_REQUEST, updateProduct),
]);
