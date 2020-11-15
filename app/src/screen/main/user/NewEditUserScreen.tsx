import React from "react";

import { View, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DismissKeyboard from "../../../components/DismissKeyboard";
import { ScrollView } from "react-native-gesture-handler";
import AppButton from "../../../components/AppButton";

const NewEditUserScreen: React.FC = () => {
  const Separator = () => <View style={{ marginVertical: 10 }} />;

  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={styles.action}>
          <Ionicons name="ios-person" size={24} color="gray" />
          <TextInput
            placeholder="Nome"
            style={styles.textInput}
            keyboardType="default"
          />
        </View>

        <Separator />

        <View style={styles.action}>
          <Ionicons name="md-mail" size={24} color="gray" />
          <TextInput
            placeholder="E-mail"
            style={styles.textInput}
            keyboardType="email-address"
          />
        </View>
        <Separator />

        <View style={styles.action}>
          <Ionicons name="md-key" size={24} color="gray" />
          <TextInput
            placeholder="Senha"
            style={styles.textInput}
            keyboardType="email-address"
          />
        </View>
        <Separator />
        <AppButton title="Cadastrar" onPress={() => {}} />
      </ScrollView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: "#05375a",
  },
});

export default NewEditUserScreen;
