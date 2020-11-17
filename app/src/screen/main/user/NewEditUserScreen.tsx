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
import { useForm, Controller } from "react-hook-form";
import { NewEditUserScreenProp } from "./users.routes";

type FormData = {
  name: string;
  email: string;
  password: string;
  role: number;
};

const NewEditUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<NewEditUserScreenProp>();
  const isFocused = useIsFocused();
  const { control, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);
  const { isNewUser } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: isNewUser === true ? "Novo Usuário" : "Editar Usuário",
    });
  }, [isNewUser, isFocused]);

  const Separator = () => <View style={{ marginVertical: 10 }} />;
  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="Nome"
              icon="ios-person"
              onChangeText={(value) => onChange(value)}
              value={value}
              errors={errors.name?.message}
            />
          )}
          rules={{
            required: { value: true, message: "nome é obrigatório" },
          }}
          name="name"
          defaultValue=""
        />

        <Separator />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="E-mail"
              icon="ios-mail"
              keyboardType="email-address"
              onChangeText={(value) => onChange(value)}
              value={value}
              errors={errors.email?.message}
            />
          )}
          name="email"
          rules={{
            required: { value: true, message: "e-mail é obrigatório" },
          }}
          defaultValue=""
        />
        <Separator />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="Password"
              icon="md-key"
              secureTextEntry
              value={value}
              onChangeText={(value) => onChange(value)}
              errors={errors.password?.message}
            />
          )}
          name="password"
          rules={{
            required: { value: true, message: "senha é obrigatório" },
            minLength: { value: 6, message: "necessário ter 6 caracteres" },
          }}
          defaultValue=""
        />

        <Separator />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <SegmentedControl
              values={Object.values(RoleUser).map((item) =>
                roleUserToString(String(item))
              )}
              selectedIndex={value}
              onChange={(event) => {
                onChange(event.nativeEvent.selectedSegmentIndex);
              }}
            />
          )}
          name="role"
          defaultValue={1}
        />
        <Separator />
        <AppButton title="Cadastrar" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({});

export default NewEditUserScreen;
