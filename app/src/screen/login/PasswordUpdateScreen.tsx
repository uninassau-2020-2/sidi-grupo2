import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function PasswordUpdateScreen() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));

  const navigation = useNavigation();

  function handleToNavigateToLogin() {
    navigation.navigate("Login");
  }

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Senha atualizada</Text>
        <Avatar.Icon style={styles.logo} size={80} icon="check" />
        <Text style={styles.subTitle}>Sua senha foi atualizada !</Text>

        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={handleToNavigateToLogin}
        >
          <Text style={styles.submitText}>Confirmar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  btnSubmit: {
    backgroundColor: "#35AAFF",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 20,
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: "#FFF",
  },
  title: {
    margin: 12,
    marginTop: -80,
    fontSize: 24,
    color: "#5c657e",
    fontWeight: "bold",
  },
  logo: {
    justifyContent: "center",
    marginTop: 20,
  },
  subTitle: {
    margin: 12,
    marginTop: 25,
    fontSize: 18,
    color: "#5c657e",
  },
});
