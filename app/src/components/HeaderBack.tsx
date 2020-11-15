import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface HeaderBackProps {
  onPress?: () => void;
}

export default function HeaderBack({ onPress }: HeaderBackProps) {
  const navigation = useNavigation();
  return (
    <RectButton
      style={styles.button}
      onPress={() => onPress || navigation.goBack()}
    >
      <Ionicons name="md-arrow-back" size={24} color="#05375a" />
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 24,
  },
});
