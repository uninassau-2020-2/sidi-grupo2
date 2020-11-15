import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "../screen/main/MainStack";

const { Navigator, Screen } = createStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={MainStack}
        options={{ title: "Início", headerShown: false }}
      />
    </Navigator>
  );
}
