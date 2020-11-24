import { CategoryAction, CategoryState, CategoryTypes } from "./types";
const INITIAL_STATE: CategoryState = {
  data: [],
  error: null,
  loading: false,
  sendSucess: false,
  sendError: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    /**
     * Get users
     */
    case CategoryTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CategoryTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case CategoryTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    /**
     * Add new user
     */
    case CategoryTypes.RESET:
      return {
        ...state,
        sendSucess: INITIAL_STATE.sendSucess,
        loading: INITIAL_STATE.loading,
        sendError: INITIAL_STATE.sendError,
      };
    case CategoryTypes.CREATE_REQUEST:
    case CategoryTypes.UPDATE_REQUEST:
      return { ...state, sendSucess: false, loading: true };
    case CategoryTypes.SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        sendSucess: true,
      };
    case CategoryTypes.SEND_FAILURE:
      return {
        ...state,
        loading: false,
        sendError: action.payload.error,
        sendSucess: false,
      };
    default:
      return state;
  }
}
