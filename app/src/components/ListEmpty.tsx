import React from "react";

import { View, Text, StyleSheet } from "react-native";

interface IListEmpty {
  text?: string;
}

const ListEmpty = ({
  text = "Ops! Nada foi cadastrado ainda.",
}: IListEmpty) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#d4d4d4",
  },
});

export default ListEmpty;
