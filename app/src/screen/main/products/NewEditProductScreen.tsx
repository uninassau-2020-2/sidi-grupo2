import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  AppButton,
  DismissKeyboard,
  Input,
  InputSwitch,
  Separator,
  TextError,
  InputSelect,
} from "../../../components";
import { ProductRequest } from "../../../interface";
import { StoreState } from "../../../services/store/createStore";
import {
  createRequestAction,
  loadRequestAction,
  resetAction,
  updateRequestAction,
} from "../../../services/store/ducks/product/actions";
import { NewEditProductScreenProp } from "./products.routes";

const NewEditProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<NewEditProductScreenProp>();
  const { isNewProduct, product: productParam } = route.params;
  const dispatch = useDispatch();

  const { sendSucess, sendError, loading } = useSelector(
    (state: StoreState) => state.provider
  );
  const { control, handleSubmit, errors } = useForm<ProductRequest>({
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      name: productParam?.name || "",
      description: productParam?.description || "",
      amount: Number(productParam?.amount) || 0,
      salePrice: productParam?.salePrice || "",
      costPrice: productParam?.costPrice || "",
      active: productParam?.active || true,
      barCorde: productParam?.barCorde || "",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: isNewProduct === true ? "Novo produto" : "Editar produto",
    });
  }, [isNewProduct, isFocused]);

  useEffect(() => {
    if (sendSucess === true) {
      dispatch(resetAction());
      dispatch(loadRequestAction());
      navigation.goBack();
    }
  }, [sendSucess]);

  useEffect(() => {
    if (sendSucess === true) {
      dispatch(resetAction());
      dispatch(loadRequestAction());
      navigation.goBack();
    }
  }, [sendSucess]);

  const onSubmit = (povider: ProductRequest) => {
    console.log("povider", povider);
    if (isNewProduct) dispatch(createRequestAction(povider));
    else dispatch(updateRequestAction(povider, productParam?.id || 0));
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
            name="name"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Nome do produto"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="Nome do Produto"
                value={value}
                errors={errors.name?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "nome do produto é obrigatório",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="description"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Descição"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="Descrição"
                value={value}
                numberOfLines={4}
                errors={errors.description?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "descrição é obrigatória",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="barCorde"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Código de Barra"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="Código de Barra"
                value={value}
                errors={errors.barCorde?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "código de barra é obrigatório",
              },
              minLength: {
                value: 8,
                message: "código de barra inválido",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="amount"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Quantidade"
                icon="ios-business"
                onChangeText={(value) => onChange(Number(value))}
                label="Quantidade"
                keyboardType="number-pad"
                value={value ? String(value) : ""}
                errors={errors.amount?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "quantidade é obrigatória",
              },
              min: {
                value: 0,
                message: "mínimo 1 para quantidade",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="salePrice"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Preço de Venda"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="Preço de Venda"
                keyboardType="decimal-pad"
                value={value}
                errors={errors.salePrice?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "preço de venda é obrigatório",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="costPrice"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Preço de Compra"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="Preço de Compra"
                keyboardType="decimal-pad"
                value={value}
                errors={errors.costPrice?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "preço de compra é obrigatório",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="costPrice"
            render={({ onChange, onBlur, value }) => (
              <InputSelect
                placeholder="Preço de Compra"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="Preço de Compra"
                keyboardType="decimal-pad"
                value={value}
                errors={errors.costPrice?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "preço de compra é obrigatório",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="active"
            render={({ onChange, onBlur, value }) => (
              <InputSwitch
                label="Produto ativo?"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Separator />

          <TextError error={sendError?.errorMessage} />
          <Separator />
          <AppButton
            disabled={loading}
            title={isNewProduct ? "Cadastrar" : "Salvar"}
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({});

export default NewEditProductScreen;
