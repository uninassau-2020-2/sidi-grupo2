import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { RectButton } from "react-native-gesture-handler";

import {
  DrawerActions,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import User from "./UsersScreen";
import NewEditUser from "./NewEditUserScreen";

import HeaderBack from "../../../components/HeaderBack";
import { IUsers } from "../../../interface";

export type UserScreenParam = {
  User: undefined;
  NewEditUser: { isNewUser: boolean; user: IUsers };
};

export type NewEditUserScreenProp = RouteProp<UserScreenParam, "NewEditUser">;

const { Navigator, Screen } = createStackNavigator<UserScreenParam>();

const UsersRoutes: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f2f2f2",
        },
        headerTintColor: "#5c657e",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
        },
        headerLeft: ({ tintColor }) => (
          <RectButton
            style={{ padding: 12 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Ionicons
              name="md-menu"
              size={24}
              color="gray"
              style={{ color: tintColor }}
            />
          </RectButton>
        ),
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
