import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import user from "./user/sagas";
import category from "./category/sagas";
import product from "./product/sagas";
import provider from "./provider/sagas";

export default function* rootSaga() {
  return yield all([auth, user, category, product, provider]);
}
