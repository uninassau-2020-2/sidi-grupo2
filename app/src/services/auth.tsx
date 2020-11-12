import { Use } from "react-native-svg";
import { IUser } from "../context/auth.context";
import api, { RequestMethod } from "./api";

interface ResponseUser {
  token: string;
  user: IUser;
}

export async function signIn(
  user: string,
  password: string
): Promise<ResponseUser> {
  const response = await api.request<void, ResponseUser>({
    method: RequestMethod.POST,
    url: "/auth/login",
    data: { username: user, password: password },
  });
  return response;
}