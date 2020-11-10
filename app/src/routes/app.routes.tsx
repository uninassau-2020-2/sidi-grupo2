import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { Navigator, Screen } = createStackNavigator();

import MainStack from "../screen/main/MainStack";

export default function AppRoutes() {
  return (
    <Navigator
      screenOptions={
        {
          // headerTitleStyle: { alignSelf: "center" },
          // cardStyle: { backgroundColor: "#fff" },
        }
      }
    >
      <Screen
        name="Home"
        component={MainStack}
        options={{ title: "Início", headerShown: false }}
      />
    </Navigator>
  );
}
