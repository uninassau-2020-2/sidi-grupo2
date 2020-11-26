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
  View,
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
import { Category, ProductRequest, Provider } from "../../../interface";
import { StoreState } from "../../../services/store/createStore";
import {
  createRequestAction,
  loadRequestAction,
  resetAction,
  updateRequestAction,
} from "../../../services/store/ducks/product/actions";
import { loadRequestAction as categoryRequestAction } from "../../../services/store/ducks/category/actions";
import { loadRequestAction as providerRequestAction } from "../../../services/store/ducks/provider/actions";
import { NewEditProductScreenProp } from "./products.routes";
import { MeasuredUnit } from "../../../enum";

const NewEditProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<NewEditProductScreenProp>();
  const { isNewProduct, product: productParam } = route.params;
  const dispatch = useDispatch();

  const { sendSucess, sendError, loading } = useSelector(
    (state: StoreState) => state.product
  );

  const { data: dataCategory } = useSelector(
    (state: StoreState) => state.category
  );

  const { data: dataProvider } = useSelector(
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
      active: productParam?.active === true,
      barCode: productParam?.barCode || "",
      categoryId: productParam?.category.id || 0,
      providerId: productParam?.provider.id || 0,
      measuredUnit: productParam?.measuredUnit || MeasuredUnit.GR,
      brand: productParam?.brand || "foto",
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(resetAction());
    });

    return unsubscribe;
  }, [navigation]);

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
    if (dataCategory.length === 0) {
      dispatch(categoryRequestAction());
    }
    console.log("dataProvider.length", dataProvider.length);
    if (dataProvider.length === 0) {
      dispatch(providerRequestAction());
    }
  }, []);

  const onSubmit = (provider: ProductRequest) => {
    if (isNewProduct) dispatch(createRequestAction(provider));
    else dispatch(updateRequestAction(provider, productParam?.id || 0));
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
            name="barCode"
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Código de Barra"
                icon="ios-business"
                onChangeText={(value) => onChange(value)}
                label="Código de Barra"
                value={value}
                errors={errors.barCode?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "código de barra é obrigatório",
              },
              minLength: {
                value: 13,
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
          <View style={styles.groupField}>
            <Controller
              control={control}
              name="salePrice"
              render={({ onChange, onBlur, value }) => (
                <Input
                  width="45%"
                  placeholder="Preço de Venda"
                  icon="md-cash"
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
                  icon="ios-cash"
                  width="45%"
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
          </View>
          <Separator />
          <Controller
            control={control}
            name="measuredUnit"
            errors={errors.providerId?.message}
            render={({ onChange, onBlur, value }) => (
              <InputSelect
                label="Unidade de Medida"
                onSelected={(selected: any) => {
                  onChange(selected.Name);
                  return selected;
                }}
                selectedItemId={Object.values(MeasuredUnit).indexOf(value)}
                values={Object.values(MeasuredUnit).map((item, index) => {
                  return {
                    Id: index,
                    Name: item,
                  };
                })}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "unidade de medida é obrigatório",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="categoryId"
            render={({ onChange, onBlur, value }) => (
              <InputSelect
                label="Categoria"
                onSelected={(selected: any) => {
                  onChange(selected.Id);
                  return selected;
                }}
                selectedItemId={value}
                errors={errors.categoryId?.message}
                values={dataCategory.map((item: Category) => {
                  return {
                    Id: item.id,
                    Name: item.name,
                  };
                })}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "categoria é obrigatória",
              },
            }}
          />
          <Separator />
          <Controller
            control={control}
            name="providerId"
            errors={errors.providerId?.message}
            render={({ onChange, onBlur, value }) => (
              <InputSelect
                label="Fornecedor"
                onSelected={(selected: any) => {
                  onChange(selected.Id);
                  return selected;
                }}
                selectedItemId={value}
                values={dataProvider.map((item: Provider) => {
                  return {
                    Id: item.id,
                    Name: item.companyName,
                  };
                })}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "fornecedor é obrigatório",
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
          <Controller
            control={control}
            name="brand"
            render={({ onChange, onBlur, value }) => <View />}
          />
          <Separator />
          {sendError && <TextError error={sendError?.errorMessage} />}
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

const styles = StyleSheet.create({
  groupField: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default NewEditProductScreen;
