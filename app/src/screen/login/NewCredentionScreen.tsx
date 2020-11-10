import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

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
    <Animatable.View style={styles.container} animation="fadeInUpBig">
      <View style={styles.header}>
        <Text style={styles.text_header}>Digite sua nova senha</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>SENHA</Text>
        <View style={styles.action}>
          <Ionicons name="md-mail" size={20} color="gray" />
          <TextInput
            placeholder="sua senha..."
            secureTextEntry
            style={styles.textInput}
          />
        </View>
        <Text style={[styles.text_footer, { marginTop: 35 }]}>
          CONFIRMAR SENHA
        </Text>
        <View style={styles.action}>
          <Ionicons name="md-lock" size={20} color="gray" />
          <TextInput
            placeholder="confirme a senha..."
            secureTextEntry
            style={styles.textInput}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleToNavigateToPasswordUpdade}
          >
            <Text style={[styles.textSign, { color: "#fff" }]}>Entrar</Text>
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
    flex: 2,
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
    borderRadius: 10,
    backgroundColor: "#05375a",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
