import { action } from "typesafe-actions";
import { Auth, User } from "../../../../interface";
import { AuthTypes } from "./types";

export function signInRequest({ email, password }: Auth) {
  return action(AuthTypes.LOAD_REQUEST, {
    email,
    password,
  });
}

export function signInSuccess({ user, token }: { token: string; user: User }) {
  return action(AuthTypes.LOAD_SUCCESS, {
    token,
    user,
  });
}

export function signInFailure() {
  return action(AuthTypes.LOAD_FAILURE);
}

export function logoutAction() {
  return action(AuthTypes.LOAD_LOGOUT);
}
