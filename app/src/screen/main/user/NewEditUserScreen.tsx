import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import SegmentedControl from "@react-native-community/segmented-control";
import { ScrollView } from "react-native-gesture-handler";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { UserRequest } from "../../../interface";
import { RoleUser } from "../../../enum";
import { Input, AppButton, DismissKeyboard } from "../../../components";
import {
  indexOfRoleUser,
  roleUserFromIndex,
  roleUserToString,
} from "../../../util";
import { NewEditUserScreenProp } from "./users.routes";
import {
  addRequestAction,
  cleanAdd,
  loadRequest,
  updateUserAction,
} from "../../../services/store/ducks/user/actions";
import { StoreState } from "../../../services/store/createStore";

const NewEditUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<NewEditUserScreenProp>();
  const { isNewUser, user: userParam } = route.params;
  const isFocused = useIsFocused();
  const { control, handleSubmit, errors } = useForm<UserRequest>({
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      name: userParam?.name || "",
      email: userParam?.email || "",
      password: "",
      role: (userParam?.role as RoleUser) || RoleUser.SELLER,
    },
  });
  const dispatch = useDispatch();
  const { addSucess, addError } = useSelector(
    (state: StoreState) => state.user
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(cleanAdd());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: isNewUser === true ? "Novo Usuário" : "Editar Usuário",
    });
  }, [isNewUser, isFocused]);

  useEffect(() => {
    if (addSucess === true) {
      dispatch(cleanAdd());
      dispatch(loadRequest());
      navigation.goBack();
    }
  }, [addSucess]);

  const onSubmit = (user: UserRequest) => {
    if (isNewUser) dispatch(addRequestAction(user));
    else dispatch(updateUserAction(user, userParam?.id || 0));
  };

  const Separator = () => <View style={{ marginVertical: 10 }} />;
  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Controller
          control={control}
          name="name"
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
        />

        <Separator />
        <Controller
          control={control}
          name="email"
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="E-mail"
              icon="ios-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) => onChange(value)}
              value={value}
              errors={errors.email?.message}
            />
          )}
          rules={{
            required: { value: true, message: "e-mail é obrigatório" },
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "e-mail inválido",
            },
          }}
        />
        <Separator />
        <Controller
          control={control}
          name="password"
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
          rules={
            isNewUser
              ? {
                  required: { value: true, message: "senha é obrigatória" },
                  minLength: {
                    value: 6,
                    message: "necessário ter 6 caracteres",
                  },
                }
              : undefined
          }
        />

        <Separator />
        <Controller
          control={control}
          name="role"
          render={({ onChange, onBlur, value }) => (
            <SegmentedControl
              values={Object.values(RoleUser).map((item) =>
                roleUserToString(String(item))
              )}
              selectedIndex={indexOfRoleUser(value)}
              onChange={(event) => {
                const role = roleUserFromIndex(
                  event.nativeEvent.selectedSegmentIndex
                );
                onChange(role);
              }}
            />
          )}
        />
        <Separator />
        {addError && <Text>{addError.errorMessage}</Text>}
        <Separator />
        <AppButton
          title={isNewUser ? "Cadastrar" : "Salvar"}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({});

export default NewEditUserScreen;
