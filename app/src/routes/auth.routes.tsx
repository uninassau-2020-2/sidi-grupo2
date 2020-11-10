import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screen/login/SignInScreen";
import Login from "../screen/login/LoginScreen";
import Register from "../screen/login/ForgotpassScreen";
import NewCredention from "../screen/login/NewCredentionScreen";
import PasswordUpdate from "../screen/login/PasswordUpdateScreen";

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Navigator>
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
);

export default AuthRoutes;
