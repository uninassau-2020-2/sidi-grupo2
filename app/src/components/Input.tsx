import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
  Text,
  StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  icon?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  errors?: string | Array<string> | null;
  width?: number | string;
  label?: string;
  numberOfLines?: number;
}

export default function Input({
  icon,
  keyboardType = "default",
  placeholder = "",
  errors,
  width = "auto",
  label,
  numberOfLines = 1,
  ...props
}: InputProps) {
  const sizeIcon = 24;

  let textarea: TextInputProps | null = null;

  if (numberOfLines > 1) {
    textarea = {
      numberOfLines: numberOfLines,
      multiline: true,
    };
  }

  const _textInput = {
    ...styles.textInput,
    minHeight: numberOfLines ? numberOfLines * 16 : "auto",
  };

  return (
    <View style={{ width: width }}>
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.container}>
          {icon ? (
            <Ionicons name={icon} size={sizeIcon} color="gray" />
          ) : (
            <View style={{ width: 1, height: sizeIcon }} />
          )}
          <TextInput
            placeholder={placeholder}
            style={_textInput}
            keyboardType={keyboardType || "default"}
            {...textarea}
            {...props}
          />
        </View>
        {errors && <Text style={styles.errorText}>{errors}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d5d5d5",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: "#05375a",
  },
  label: {
    color: "gray",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
  },
});
