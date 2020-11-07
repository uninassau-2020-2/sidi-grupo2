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
import { TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";


import { NavigationContainer, StackActions } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

export default function NewCredentionScreen() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const navigation = useNavigation();

  function handleToNavigateToPasswordUpdade() {
    navigation.navigate("PasswordUpdate");
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
      
      <Avatar.Icon style={styles.logo} size={80} icon="credential" />
      <Text style={styles.title}>Nova senha</Text>
      <Text style={styles.subTitle}>sua identidade foi verificada defina sua nova senha</Text>

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
            placeholder="Nova senha"
            autoCorrect={false}
            onChangeText={() => {}}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme a senha"
            autoCorrect={false}
            onChangeText={() => {}}
          />
          <TouchableOpacity
            style={styles.btnSubmit}
           onPress={handleToNavigateToPasswordUpdade}
          >
            <Text style={styles.submitText}>Confirmar</Text>
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

  }
});