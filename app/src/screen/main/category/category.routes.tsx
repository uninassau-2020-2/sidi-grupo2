import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";
import CategoryScreen from "./CategoryScreen";
import NewEditCategoryScreen from "./NewEditCategoryScreen";

import HeaderBack from "../../../components/HeaderBack";
import HeaderDrawer from "../../../components/HeaderDrawer";
import { Category } from "../../../interface";
import { screenOptionDefault } from "../../../util";

export type CategoryScreenParam = {
  Category: undefined;
  NewEditCategory: { isNewCategory: boolean; category: Category };
};

export type NewEditUserScreenProp = RouteProp<
  CategoryScreenParam,
  "NewEditCategory"
>;

const { Navigator, Screen } = createStackNavigator<CategoryScreenParam>();

const UsersRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        ...screenOptionDefault,
        headerLeft: ({ tintColor }) => <HeaderDrawer tintColor={tintColor} />,
      }}
    >
      <Screen
        name="Category"
        component={CategoryScreen}
        options={{ title: "Categoria" }}
      />
      <Screen
        name="NewEditCategory"
        component={NewEditCategoryScreen}
        options={{ title: "Categoria", headerLeft: () => <HeaderBack /> }}
        initialParams={{ isNewCategory: true }}
      />
    </Navigator>
  );
};

export default UsersRoutes;
