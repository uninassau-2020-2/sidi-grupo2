import React from "react";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "../../../context/shoppingCart.context";
import List from "./ListComponent";

const CashierScreen: React.FC = () => {
  return (
    <AppProvider>
      <List />
    </AppProvider>
  );
};

export default CashierScreen;
