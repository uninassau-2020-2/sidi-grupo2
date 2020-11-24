import React from "react";

import { Text, StyleSheet } from "react-native";

interface TextErrorProps {
  error?: string;
  show?: boolean;
}

export default function TextError({ error, show = true }: TextErrorProps) {
  if (!show || error === undefined) return null;
  return <Text style={styles.errorText}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: "#e82905",
  },
});
