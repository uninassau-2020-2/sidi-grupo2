import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";
import User from "./UsersScreen";
import NewEditUser from "./NewEditUserScreen";

import HeaderBack from "../../../components/HeaderBack";
import { IUsers } from "../../../interface";
import HeaderDrawer from "../../../components/HeaderDrawer";
import { screenOptionDefault } from "../../../util";

export type UserScreenParam = {
  User: undefined;
  NewEditUser: { isNewUser: boolean; user: IUsers };
};

export type NewEditUserScreenProp = RouteProp<UserScreenParam, "NewEditUser">;

const { Navigator, Screen } = createStackNavigator<UserScreenParam>();

const UsersRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        ...screenOptionDefault,
        headerLeft: ({ tintColor }) => <HeaderDrawer tintColor={tintColor} />,
      }}
    >
      <Screen name="User" component={User} options={{ title: "Usuários" }} />
      <Screen
        name="NewEditUser"
        component={NewEditUser}
        options={{ title: "Usuários", headerLeft: () => <HeaderBack /> }}
        initialParams={{ isNewUser: true }}
      />
    </Navigator>
  );
};

export default UsersRoutes;
