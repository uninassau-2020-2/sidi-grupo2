import createSagaMiddleware from "redux-saga";
import { Middleware } from "redux";

import createStore from "./createStore";
import rootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export { store };
