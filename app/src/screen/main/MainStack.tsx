import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

const { Navigator, Screen } = createDrawerNavigator();

import Home from "./HomeScreen";
//import Product from "./products/ProductScreen";
import UserRoutes from "./user/users.routes";
import Cashier from "./cashier/CashierScreen";
import Category from "./category/category.routes";
import Product from "./products/products.routes";
import Provider from "./provider/provider.routes";
import Profile from "./ProfileScreen";
import Sale from "./SalesScreen";
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
      <Screen name="Minhas Vendas" component={Sale} />

      <Screen
        name="Produtos"
        component={Product}
        options={{ headerShown: false }}
      />
      <Screen
        name="Categorias"
        component={Category}
        options={{ headerShown: false }}
      />
      <Screen
        name="Fornecedores"
        component={Provider}
        options={{ headerShown: false }}
      />
      <Screen
        name="Usuários"
        component={UserRoutes}
        options={{ headerShown: false }}
      />
      <Screen name="Perfil" component={Profile} />
    </Navigator>
  );
}
