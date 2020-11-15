import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screen/login/SignInScreen";
import Login from "../screen/login/LoginScreen";
import Register from "../screen/login/ForgotpassScreen";
import NewCredention from "../screen/login/NewCredentionScreen";
import PasswordUpdate from "../screen/login/PasswordUpdateScreen";

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Login" component={Login} options={{ title: "Login" }} />
    <Screen name="SignIn" component={SignIn} options={{ title: "SignIn" }} />
    <Screen
      name="Register"
      component={Register}
      options={{ title: "Registrar" }}
    />
    <Screen
      name="NewCredention"
      component={NewCredention}
      options={{ title: "Nova Senha" }}
    />
    <Screen
      name="PasswordUpdate"
      component={PasswordUpdate}
      options={{ title: "Senha alterada" }}
    />
  </Navigator>
);

export default AuthRoutes;
