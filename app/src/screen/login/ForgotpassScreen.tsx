import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { RectButton } from "react-native-gesture-handler";

import { NavigationContainer, StackActions } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

export default function ForgotpassScreen() {
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
        <StatusBar style="light" />
        <View>
          <Text>Register</Text>
        </View>
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

          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <RectButton style={styles.btnSubmit}>
            <Text style={styles.submitText}>Cadastrar</Text>
          </RectButton>
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
  containerLogo: {
    flex: 1,
    justifyContent: "center",
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
    padding: 10,
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
});
