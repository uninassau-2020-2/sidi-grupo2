import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
export default function LoginScreen() {
  const navigation = useNavigation();

  function handleToNavigateToSignIn() {
    navigation.navigate("SignIn");
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        {/* <Animatable.Image
          animation="bounceIn"
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode={"stretch"}
        />  */}
      </View>
      <Animatable.View style={styles.footer}>
        <Text style={styles.title}>Fique conectado!</Text>
        <Text style={styles.text}>Entrar com conta</Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleToNavigateToSignIn}
          >
            <Text style={styles.textSign}>Vamos começar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2f2",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    color: "gray",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "#A6A6A6",
  },
  textSign: {
    color: "#fff",
    fontWeight: "bold",
  },
});
