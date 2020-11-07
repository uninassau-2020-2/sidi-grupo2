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
import { StatusBar } from "expo-status-bar";
import { RectButton } from "react-native-gesture-handler";
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

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
    <Animatable.View
     style={styles.container}
     animation="fadeInUpBig"
     >
      <View style={styles.header}>
        <Text style={styles.text_header}>Senha alterada com sucesso!</Text>
      </View>
        <View style={styles.footer}>
          <View style={styles.action}>
            <Ionicons name="md-checkmark-circle" size={120} color="green" />
          </View>
          <View style={styles.button}>
            <TouchableOpacity 
            style={styles.signIn}
            onPress={handleToNavigateToLogin}
            >
              <Text style={[styles.textSign,{color:"#fff"}]}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2f2"
  },
  header:{
    flex: 1,
    justifyContent:"flex-end",
    paddingHorizontal:20,
    paddingBottom:50,
  },
  footer:{
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text_header:{
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30,
  },
  action:{
    marginTop: 10,
    paddingBottom: 5,
    alignItems: "center", 
  },
  button:{
    alignItems: "center",
    marginTop: 50
  },
  signIn:{
    width: "100%",
    height:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
    backgroundColor: "#05375a"
  },
  textSign:{
    fontSize: 18,
    fontWeight: "bold",
  }
})
