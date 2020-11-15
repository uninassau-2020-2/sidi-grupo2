import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import User from "./UsersScreen";
import NewEditUser from "./NewEditUserScreen";
import { Button } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import HeaderBack from "../../../components/HeaderBack";

const { Navigator, Screen } = createStackNavigator();

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
          <Button
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Ionicons
              name="md-menu"
              size={20}
              color="gray"
              style={{ color: tintColor }}
            />
          </Button>
        ),
      }}
    >
      <Screen name="user" component={User} options={{ title: "Usuários" }} />
      <Screen
        name="newEditUser"
        component={NewEditUser}
        options={{ title: "Usuários", headerLeft: () => <HeaderBack /> }}
      />
    </Navigator>
  );
};

export default UsersRoutes;
