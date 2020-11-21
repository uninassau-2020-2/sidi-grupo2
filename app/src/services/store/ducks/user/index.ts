import { Reducer } from "redux";
import { UserAction, UserState, UserTypes } from "./types";

const INITIAL_STATE: UserState = {
  data: [],
  error: false,
  loading: false,
};

const reducer: Reducer<UserState> = (
  state = INITIAL_STATE,
  action: UserAction
) => {
  switch (action.type) {
    case UserTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, data: action.payload };
    case UserTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, data: [] };
    default:
      return state;
  }
};

export default reducer;
