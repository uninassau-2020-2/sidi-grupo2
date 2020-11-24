import { ProviderAction, ProviderState, ProviderTypes } from "./types";

const INITIAL_STATE: ProviderState = {
  data: [],
  error: null,
  loading: false,
  sendSucess: false,
  sendError: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action: ProviderAction
): ProviderState {
  switch (action.type) {
    /**
     * Get provider
     */
    case ProviderTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case ProviderTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case ProviderTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };

    /**
     * Add new provider
     */
    case ProviderTypes.RESET:
      return {
        ...state,
        sendSucess: INITIAL_STATE.sendSucess,
        loading: INITIAL_STATE.loading,
        sendError: INITIAL_STATE.sendError,
      };
    case ProviderTypes.CREATE_REQUEST:
    case ProviderTypes.UPDATE_REQUEST:
      return { ...state, sendSucess: false, loading: true };
    case ProviderTypes.SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        sendSucess: true,
        sendError: null,
      };
    case ProviderTypes.SEND_FAILURE:
      console.log("action.payload.error", action.payload.error);
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
