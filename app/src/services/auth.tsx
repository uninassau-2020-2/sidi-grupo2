import { IUser } from "../context/auth.context";
import api, { RequestMethod } from "./api";

interface ResponseUser {
  token: string;
  user: IUser;
}

export async function signIn(
  email: string,
  password: string
): Promise<ResponseUser> {
  const response = await api.request<void, ResponseUser>({
    method: RequestMethod.POST,
    url: "/auth/login",
    data: { email: email, password: password },
  });
  return response;
}
