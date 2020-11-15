import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
interface IAppButton {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function AppButton({
  onPress,
  title,
  disabled = false,
}: IAppButton) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#05375a",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
});
