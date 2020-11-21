import { AuthState, AuthAction, AuthTypes } from "./types";

const initialState: AuthState = {
  loadingSignInRequest: false,
  isSignedIn: false,
  error: false,
  token: null,
  user: null,
};

export default function auth(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthTypes.LOAD_REQUEST:
      return {
        ...state,
        loadingSignInRequest: true,
      };

    case AuthTypes.LOAD_SUCCESS:
      return {
        ...state,
        loadingSignInRequest: false,
        isSignedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case AuthTypes.LOAD_FAILURE:
      return {
        ...state,
        loadingSignInRequest: false,
        error: true,
      };
    default:
      return state;
  }
}
