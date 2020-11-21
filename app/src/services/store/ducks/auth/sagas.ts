import { AuthTypes } from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, call, put, all, takeEvery } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import api from "../../../api";

export function* signIn({ payload }: ActionType<typeof actions.signInRequest>) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "/auth/login", {
      email: email,
      password: password,
    });

    if (response.fail) {
      console.log("response.responseErrors", response.responseErrors);
      yield put(actions.signInFailure(response.responseErrors));
    } else {
      yield call(store, "@auth:user", JSON.stringify(response.user));
      yield call(store, "@auth:token", response.token);

      yield put(
        actions.signInSuccess({ token: response.token, user: response.user })
      );
    }
  } catch (err) {
    yield put(actions.signInFailure(err));
  }
}

async function store(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // console.log("AsyncStorage error during token store:", error);
  }
}

async function removeStore(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // console.log("AsyncStorage error during token store:", error);
  }
}

export function* logout() {
  yield call(removeStore, "@auth:user");
  yield call(removeStore, "@auth:token");
  console.log("FINISHH");
}

export default all([
  takeLatest(AuthTypes.LOAD_REQUEST, signIn),
  takeEvery(AuthTypes.LOAD_LOGOUT, logout),
]);
