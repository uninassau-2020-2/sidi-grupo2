import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";
import ProductScreen from "./ProductScreen";
import NewEditProductScreen from "./NewEditProductScreen";

import HeaderBack from "../../../components/HeaderBack";
import HeaderDrawer from "../../../components/HeaderDrawer";
import { screenOptionDefault } from "../../../util";
import { Product } from "../../../interface";

export type ProductScreenParam = {
  Product: undefined;
  NewEditProduct: { isNewProduct: boolean; product: Product | null };
};

export type NewEditProductScreenProp = RouteProp<
  ProductScreenParam,
  "NewEditProduct"
>;

const { Navigator, Screen } = createStackNavigator<ProductScreenParam>();

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
        component={ProductScreen}
        options={{ title: "Produtos" }}
      />
      <Screen
        name="NewEditProduct"
        component={NewEditProductScreen}
        options={{ title: "Produtos", headerLeft: () => <HeaderBack /> }}
        initialParams={{ isNewProduct: true, product: null }}
      />
    </Navigator>
  );
};

export default UsersRoutes;
