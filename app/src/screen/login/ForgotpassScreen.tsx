import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { RectButton } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { NavigationContainer, StackActions } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

export default function ForgotpassScreen() {
  const navigation = useNavigation();

  function handleToNavigateToRegister() {
    navigation.navigate("NewCredention");
  }
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));

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
        <Avatar.Icon style={styles.logo} size={80} icon="lock" />
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subTitle}>
          forneça o e-mail de sua conta para qual deseja alterar sua senha
        </Text>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY: offset.y }],
            },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleToNavigateToRegister}
          >
            <Text style={styles.submitText}>Proximo</Text>
          </TouchableOpacity>
        </Animated.View>
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
  logo: {
    justifyContent: "center",
    marginTop: 60,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
  },
  btnSubmit: {
    backgroundColor: "#35AAFF",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
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
    marginTop: 24,
    fontSize: 24,
    color: "#5c657e",
    fontWeight: "bold",
  },
  subTitle: {
    margin: 12,
    marginTop: 0,
    fontSize: 18,
    color: "#5c657e",
  },
});
