import { UserRequest } from "./../interface/index";
import api from "./api";

export async function doRemoveUser(id: number) {
  return api.delete(`/user/${id}`);
}

export async function doCreateUser(user: UserRequest) {
  return api.post("/user/", user);
}
