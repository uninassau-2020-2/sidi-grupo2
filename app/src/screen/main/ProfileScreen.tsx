import React from "react";

import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components";
import { useAuth } from "../../context/auth.context";

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  function handleSignOut() {
    signOut();
  }
  return (
    <SafeAreaView style={styles.container}>
      <AppButton title="Sair" width="80%" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
});

export default ProfileScreen;
