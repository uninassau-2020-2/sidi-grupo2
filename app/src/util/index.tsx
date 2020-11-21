import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
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

export const screenOptionDefault: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#f2f2f2",
  },
  headerTintColor: "#5c657e",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
};
