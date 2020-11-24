import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  AppButton,
  DismissKeyboard,
  Input,
  Separator,
  TextError,
} from "../../../components";
import { ProviderRequest } from "../../../interface";
import { StoreState } from "../../../services/store/createStore";
import {
  createRequestAction,
  loadRequestAction,
  resetAction,
  updateRequestAction,
} from "../../../services/store/ducks/provider/actions";
import { NewEditProviderScreenProp } from "./provider.routes";

const NewEditProviderScreen: React.FC = () => {
  const navigation = useNavigation();

  //Checa se a tela está em focus
  const isFocused = useIsFocused();
  const route = useRoute<NewEditProviderScreenProp>();
  const { isNewProvider, provider: providerParam } = route.params;
  const dispatch = useDispatch();
  const { sendSucess, sendError, loading } = useSelector(
    (state: StoreState) => state.provider
  );

  const { control, handleSubmit, errors } = useForm<ProviderRequest>({
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      cnpj: providerParam?.cnpj || "25791131000165",
      companyName:
        providerParam?.companyName || "Vinicius e Caroline Padaria Ltda",
      fantasyName: providerParam?.fantasyName || "Vinicius e Caroline Padaria",
      stateRegistration: providerParam?.stateRegistration || "942692098756",
      zipcode: providerParam?.zipcode || "05549270",
      email:
        providerParam?.email || "contabil@viniciusecarolinepadarialtda.com.br",
      site: providerParam?.site || "www.viniciusecarolinepadarialtda.com.br",
      street: providerParam?.street || "Rua Serafim Maia",
      number: Number(providerParam?.number) || 576,
      neighborhood: providerParam?.neighborhood || "Jardim das Esmeraldas",
      city: providerParam?.city || "São Paulo",
      uf: providerParam?.uf || "SP",
      phone: providerParam?.phone || "(11) 3981-8528",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: isNewProvider === true ? "Novo fornecedor" : "Editar fornecedor",
    });
  }, [isNewProvider, isFocused]);

  useEffect(() => {
    console.log("sendSucess", sendSucess);
    if (sendSucess === true) {
      dispatch(resetAction());
      dispatch(loadRequestAction());
      navigation.goBack();
    }
  }, [sendSucess]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(resetAction());
    });

    return unsubscribe;
  }, [navigation]);

  const onSubmit = (povider: ProviderRequest) => {
    if (isNewProvider) dispatch(createRequestAction(povider));
    else dispatch(updateRequestAction(povider, providerParam?.id || 0));
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={"padding"}
      >
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <Controller
            control={control}
            name="cnpj"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="CNPJ"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="CNPJ"
                value={value}
                errors={errors.cnpj?.message}
                keyboardType="number-pad"
              />
            )}
            rules={{
              required: { value: true, message: "cnpj é obrigatório" },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="companyName"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Nome"
                label="Nome"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                value={value}
                errors={errors.companyName?.message}
              />
            )}
            rules={{
              required: { value: true, message: "Nome é obrigatório" },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="fantasyName"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Nome Fantasia"
                label="Nome Fantasia"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                value={value}
                errors={errors.fantasyName?.message}
              />
            )}
            rules={{
              required: { value: true, message: "Nome Fantasia é obrigatório" },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="stateRegistration"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Inscrição Estadual"
                label="Inscrição Estadual"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                value={value}
                errors={errors.stateRegistration?.message}
                keyboardType="number-pad"
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Inscrição Estadual é obrigatória",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="email"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="E-mail"
                label="E-mail"
                icon="ios-mail"
                onChangeText={(value) => onChange(value)}
                value={value}
                errors={errors.email?.message}
                autoCapitalize="none"
              />
            )}
            rules={{
              required: {
                value: true,
                message: "e-mail é obrigatória",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="site"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Site"
                label="Site"
                icon="ios-globe"
                onChangeText={(value) => onChange(value)}
                value={value}
                errors={errors.site?.message}
                autoCapitalize="none"
              />
            )}
          />
          <Separator />
          <Controller
            control={control}
            name="phone"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Telefone"
                label="Telefone"
                icon="ios-phone-portrait"
                onChangeText={(value) => onChange(value)}
                value={value}
                errors={errors.phone?.message}
                keyboardType="number-pad"
              />
            )}
            rules={{
              required: {
                value: true,
                message: "telefone é obrigatório",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="zipcode"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="CEP"
                label="CEP"
                icon="md-locate"
                onChangeText={(value) => onChange(value)}
                value={value}
                keyboardType="number-pad"
                maxLength={8}
                errors={errors.zipcode?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "cep é obrigatório",
              },
            }}
          />
          <Separator />
          <View style={styles.groupField}>
            <Controller
              control={control}
              name="street"
              render={({ onChange, onBlur, value }) => (
                <Input
                  placeholder="Rua"
                  label="Rua"
                  icon="ios-pin"
                  width="65%"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  errors={errors.street?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "cep é obrigatório",
                },
              }}
            />
            <Controller
              control={control}
              name="number"
              render={({ onChange, onBlur, value }) => (
                <Input
                  placeholder="Número"
                  label="Número"
                  width="30s%"
                  onChangeText={(value) => onChange(Number(value))}
                  value={value ? String(value) : ""}
                  keyboardType="number-pad"
                  errors={errors.number?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "número é obrigatório",
                },
              }}
            />
          </View>
          <Separator />
          <Controller
            control={control}
            name="neighborhood"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Bairro"
                label="Bairro"
                icon="logo-dropbox"
                onChangeText={(value) => onChange(value)}
                value={value}
                errors={errors.neighborhood?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "bairro é obrigatório",
              },
            }}
          />
          <Separator />
          <View style={styles.groupField}>
            <Controller
              control={control}
              name="city"
              render={({ onChange, onBlur, value }) => (
                <Input
                  width="70%"
                  placeholder="Cidade"
                  label="Cidade"
                  icon="md-business"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  errors={errors.city?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "cidade é obrigatória",
                },
              }}
            />
            <Controller
              control={control}
              name="uf"
              render={({ onChange, onBlur, value }) => (
                <Input
                  width="25%"
                  placeholder="Estado"
                  label="Estado"
                  onChangeText={(value) => onChange(value)}
                  value={String(value).toUpperCase()}
                  errors={errors.uf?.message}
                  autoCapitalize="characters"
                  maxLength={2}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "estado é obrigatório",
                },
              }}
            />
          </View>
          <Separator />
          <TextError error={sendError?.errorMessage} />
          <Separator />
          <AppButton
            disabled={loading}
            title={isNewProvider ? "Cadastrar" : "Salvar"}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
  groupField: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default NewEditProviderScreen;
