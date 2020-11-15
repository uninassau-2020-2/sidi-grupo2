import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";
import DismissKeyboard from "../../../components/DismissKeyboard";
import { ScrollView } from "react-native-gesture-handler";
import { RoleUser } from "../../../enum";
import AppButton from "../../../components/AppButton";
import Input from "../../../components/Input";
import { roleUserToString } from "../../../util";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NewEditUserScreenProp } from "./users.routes";

const NewEditUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<NewEditUserScreenProp>();
  const isFocused = useIsFocused();
  const { isNewUser } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: isNewUser === true ? "Novo Usuário" : "Editar Usuário",
    });
  }, [isNewUser, isFocused]);

  const [name, setName] = useState("");
  const [role, setRole] = useState(0);

  const Separator = () => <View style={{ marginVertical: 10 }} />;
  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Input
          placeholder="Nome"
          icon="ios-person"
          value={name}
          onChangeText={setName}
        />

        <Separator />
        <Input
          placeholder="E-mail"
          icon="ios-mail"
          keyboardType="email-address"
        />
        <Separator />
        <Input placeholder="Password" icon="md-key" secureTextEntry />

        <Separator />
        <SegmentedControl
          values={Object.values(RoleUser).map((item) =>
            roleUserToString(String(item))
          )}
          selectedIndex={role}
          onChange={(event) => {
            setRole(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <Separator />
        <AppButton title="Cadastrar" onPress={() => {}} />
      </ScrollView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({});

export default NewEditUserScreen;
