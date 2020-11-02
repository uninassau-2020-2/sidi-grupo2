import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { Navigator, Screen } = createStackNavigator();

import Login from "./screen/login/LoginScreen";
import Register from "./screen/login/RegisterScreen";
import Home from "./screen/main/HomeScreen";

export default function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerTitleStyle: { alignSelf: "center" },
            cardStyle: { backgroundColor: "#f2f3f5" },
          }}
        >
          <Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <Screen
            name="Register"
            component={Register}
            options={{ title: "Registrar", headerShown: false }}
          />
          <Screen
            name="Home"
            component={Home}
            options={{ title: "Início", headerShown: false }}
          />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
