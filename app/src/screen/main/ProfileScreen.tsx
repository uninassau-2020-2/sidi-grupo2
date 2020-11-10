import React from "react";

import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth.context";

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  function handleSignOut() {
    signOut();
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>ProfileScreen</Text>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
});

export default ProfileScreen;
