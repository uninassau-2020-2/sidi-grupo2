import api from "./api";

export async function doRemoveUser(id: number) {
  return api.delete(`/user/${id}`);
}
