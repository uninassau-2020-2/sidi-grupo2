import React from "react";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "../../../context/shoppingCart.context";
import List from "./ListComponent";

const CashierScreen: React.FC = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default CashierScreen;
