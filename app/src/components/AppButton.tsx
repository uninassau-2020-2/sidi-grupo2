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
  const backgroundColor = !disabled ? "#05375a" : "#999";
  const _buttonStyle = {
    ...styles.button,
    backgroundColor,
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={_buttonStyle}
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
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
});
