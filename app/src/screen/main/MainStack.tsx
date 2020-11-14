import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const { Navigator, Screen } = createDrawerNavigator();

import Home from "./HomeScreen";
import Product from "./ProductScreen";
import Users from "./UsersScreen";
import Cashier from "./cashier/CashierScreen";
import Category from "./category/CategoryScreen";
import Profile from "./ProfileScreen";

export default function App() {
  return (
    <Navigator>
      <Screen name="Início" component={Home} />
      <Screen name="Caixa" component={Cashier} />
      <Screen name="Vendas" component={Home} />
      <Screen name="Produtos" component={Product} />
      <Screen name="Usuários" component={Users} />
      <Screen name="Categoria" component={Category} />
      <Screen name="Perfil" component={Profile} />
    </Navigator>
  );
}
