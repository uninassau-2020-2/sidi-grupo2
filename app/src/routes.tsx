import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { Navigator, Screen } = createStackNavigator();

import Login from "./screen/login/LoginScreen";
import SignIn from "./screen/login/SignInScreen";
import Register from "./screen/login/ForgotpassScreen";
import NewCredention from "./screen/login/NewCredentionScreen";
import PasswordUpdate from "./screen/login/PasswordUpdateScreen";
import MainStack from "./screen/main/MainStack";

export default function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator
          screenOptions={
            {
              // headerTitleStyle: { alignSelf: "center" },
              // cardStyle: { backgroundColor: "#fff" },
            }
          }
        >
          <Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "SignIn", headerShown: false }}
          />
          <Screen
            name="Register"
            component={Register}
            options={{ title: "Registrar", headerShown: false }}
          />
          <Screen
            name="Home"
            component={MainStack}
            options={{ title: "Início", headerShown: false }}
          />
          <Screen
            name="NewCredention"
            component={NewCredention}
            options={{ title: "Nova Senha", headerShown: false }}
          />
          <Screen
            name="PasswordUpdate"
            component={PasswordUpdate}
            options={{ title: "Senha alterada", headerShown: false }}
          />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
