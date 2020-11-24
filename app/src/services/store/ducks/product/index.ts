import { ProductAction, ProductState, ProductTypes } from "./types";
const INITIAL_STATE: ProductState = {
  data: [],
  error: null,
  loading: false,
  sendSucess: false,
  sendError: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action: ProductAction
): ProductState {
  switch (action.type) {
    /**
     * Get users
     */
    case ProductTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case ProductTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    /**
     * Add new user
     */
    case ProductTypes.RESET:
      return {
        ...state,
        sendSucess: INITIAL_STATE.sendSucess,
        loading: INITIAL_STATE.loading,
        sendError: INITIAL_STATE.sendError,
      };
    case ProductTypes.CREATE_REQUEST:
    case ProductTypes.UPDATE_REQUEST:
      return { ...state, sendSucess: false, loading: true };
    case ProductTypes.SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        sendSucess: true,
      };
    case ProductTypes.SEND_FAILURE:
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
