import React from "react";

import { View, Text, StyleSheet } from "react-native";

const NewEditProviderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewEditProviderScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
});

export default NewEditProviderScreen;
