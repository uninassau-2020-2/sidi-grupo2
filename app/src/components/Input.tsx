import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  icon?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
}

export default function Input({
  icon,
  keyboardType = "default",
  placeholder = "",
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {icon && <Ionicons name={icon} size={24} color="gray" />}
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={keyboardType || "default"}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: "#05375a",
  },
});
