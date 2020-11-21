import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderDrawerProps {
  tintColor?: string | undefined;
}

export default function HeaderDrawer({
  tintColor = "#5d6579",
}: HeaderDrawerProps) {
  const navigation = useNavigation();
  return (
    <RectButton
      style={{ padding: 12 }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <Ionicons
        name="md-menu"
        size={24}
        color="gray"
        style={{ color: tintColor }}
      />
    </RectButton>
  );
}
