import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));

  const navigation = useNavigation();

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  }, []);

  function handleToNavigateToHome() {
    navigation.navigate("Home");
  }

  function handleToNavigateToRegister() {
    navigation.navigate("Register");
  }

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <Text>Login</Text>
          <StatusBar style="auto" />
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
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleToNavigateToHome}
          >
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>

          <RectButton
            style={styles.btnRegister}
            onPress={handleToNavigateToRegister}
          >
            <View accessible>
              <Text style={styles.registerText}>Criar Conta</Text>
            </View>
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
    backgroundColor: "#191919",
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
