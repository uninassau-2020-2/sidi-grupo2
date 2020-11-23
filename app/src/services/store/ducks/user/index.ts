import { UserAction, UserState, UserTypes } from "./types";
const INITIAL_STATE: UserState = {
  data: [],
  error: null,
  loading: false,
  addSucess: false,
  addError: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action: UserAction
): UserState {
  switch (action.type) {
    /**
     * Get users
     */
    case UserTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case UserTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    /**
     * Add new user
     */
    case UserTypes.ADD_CLEAN:
      return {
        ...state,
        addSucess: INITIAL_STATE.addSucess,
        loading: INITIAL_STATE.loading,
        addError: INITIAL_STATE.addError,
      };
    case UserTypes.ADD_REQUEST:
      return { ...state, addSucess: false, loading: true };
    case UserTypes.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        addSucess: true,
      };
    case UserTypes.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        addError: action.payload.error,
        addSucess: false,
      };
    default:
      return state;
  }
}
