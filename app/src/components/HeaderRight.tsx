import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface HeaderProps {
  onPress: () => void;
}

export default function HeaderRight({ onPress = () => {} }: HeaderProps) {
  return (
    <BorderlessButton style={styles.button} onPress={onPress}>
      <Ionicons name="ios-add" size={32} color="#05375a" />
    </BorderlessButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 24,
  },
});
