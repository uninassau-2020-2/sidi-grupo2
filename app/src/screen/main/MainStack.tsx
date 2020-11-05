import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import Home from "./HomeScreen";
import Product from "./ProductScreen";

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Vendas" component={Home} />
      <Tab.Screen name="Produtos" component={Product} />
      <Tab.Screen name="Usuários" component={Home} />
      <Tab.Screen name="Perfil" component={Home} />
    </Tab.Navigator>
  );
}
