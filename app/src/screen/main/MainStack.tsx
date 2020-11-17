import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

const { Navigator, Screen } = createDrawerNavigator();

import Home from "./HomeScreen";
import Product from "./ProductScreen";
import UserRoutes from "./user/users.routes";
import Cashier from "./cashier/CashierScreen";
import Category from "./category/CategoryScreen";
import Profile from "./ProfileScreen";
export default function App() {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f2f2f2",
        },
        headerTintColor: "#5c657e",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
        },
      }}
    >
      <Screen name="Dados Financeiro" component={Home} />
      <Screen name="Caixa" component={Cashier} />
      <Screen name="Vendas" component={Home} />
      <Screen name="Produtos" component={Product} />
      <Screen
        name="Usuários"
        component={UserRoutes}
        options={{ headerShown: false }}
      />
      <Screen name="Categoria" component={Category} />
      <Screen name="Perfil" component={Profile} />
    </Navigator>
  );
}
