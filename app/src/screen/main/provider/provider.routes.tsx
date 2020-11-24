import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";
import ProviderScreen from "./ProviderScreen";
import NewEditProviderScreen from "./NewEditProviderScreen";

import { HeaderBack, HeaderDrawer } from "../../../components";
import { Provider } from "../../../interface";
import { screenOptionDefault } from "../../../util";

export type ProviderScreenParam = {
  Product: undefined;
  NewEditProvider: { isNewProvider: boolean; provider: Provider | null };
};

export type NewEditProviderScreenProp = RouteProp<
  ProviderScreenParam,
  "NewEditProvider"
>;

const { Navigator, Screen } = createStackNavigator<ProviderScreenParam>();

const UsersRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        ...screenOptionDefault,
        headerLeft: ({ tintColor }) => <HeaderDrawer tintColor={tintColor} />,
      }}
    >
      <Screen
        name="Product"
        component={ProviderScreen}
        options={{ title: "Fornecedores" }}
      />
      <Screen
        name="NewEditProvider"
        component={NewEditProviderScreen}
        options={{ title: "Fornecedores", headerLeft: () => <HeaderBack /> }}
        initialParams={{ isNewProvider: true, provider: null }}
      />
    </Navigator>
  );
};

export default UsersRoutes;
