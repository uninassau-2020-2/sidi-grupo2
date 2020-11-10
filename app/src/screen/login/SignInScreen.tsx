import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

export default function LoginScreen() {

  const navigation = useNavigation();

  function handleToNavigateToHome() {
    navigation.navigate("Home");
  }

  return (
    <Animatable.View
     style={styles.container}
     animation="fadeInUpBig"
     >
      <View style={styles.header}>
        <Text style={styles.text_header}>Bem vindo ReiCangaço!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>E-MAIL</Text>
        <View style={styles.action}>
          <Ionicons name="md-mail" size={20} color="gray" />
          <TextInput
            placeholder="Seu email..."
            style={styles.textInput}
            keyboardType="email-address"
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Senha</Text>
        <View style={styles.action}>
          <Ionicons name="md-lock" size={20} color="gray" />
          <TextInput
            placeholder="Sua senha..."
            style={styles.textInput}
            secureTextEntry
          />
        </View>

        <Text style={{ marginTop: 15, color: "#05375a" }}>
          Esqueceu sua senha?
        </Text>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleToNavigateToHome}
          >
            <Text style={styles.textSign}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2f2",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text_header: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "gray",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
    backgroundColor: "#05375a"
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
