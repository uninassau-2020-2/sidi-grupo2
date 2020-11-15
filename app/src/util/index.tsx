import { RoleUser } from "../enum";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export const roleUserToString = (role: string) => {
  switch (role) {
    case RoleUser.ADMIN:
      return "Administrador";
    default:
      return "Vendedor";
  }
};
