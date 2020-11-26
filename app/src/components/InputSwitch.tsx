import React from "react";

import { View, Text, StyleSheet, Switch } from "react-native";

interface InputSwitchProps {
  label?: string;
  value: boolean;
  onChange: () => void;
}

export default function InputSwitch({
  label,
  value,
  onChange,
  ...props
}: InputSwitchProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Switch
        trackColor={{ false: "#05375a", true: "#05375a" }}
        thumbColor={value ? "#fff" : "gray"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onChange}
        value={value}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "gray",
    fontWeight: "bold",
    marginBottom: 6,
  },
});
