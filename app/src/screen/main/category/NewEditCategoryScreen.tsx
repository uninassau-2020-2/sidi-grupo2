import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  AppButton,
  DismissKeyboard,
  Input,
  Separator,
  TextError,
} from "../../../components";
import { CategoryRequest } from "../../../interface";
import { StoreState } from "../../../services/store/createStore";
import {
  createRequestAction,
  loadRequestAction,
  resetAction,
  updateRequestAction,
} from "../../../services/store/ducks/category/actions";
import { NewEditCategoryScreenProp } from "./category.routes";

const NewEditCategoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<NewEditCategoryScreenProp>();
  const { isNewCategory, category: categoryParam } = route.params;
  const dispatch = useDispatch();
  const { sendSucess, sendError, loading } = useSelector(
    (state: StoreState) => state.category
  );
  const { control, handleSubmit, errors } = useForm<CategoryRequest>({
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: {
      name: categoryParam?.name || "",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: isNewCategory === true ? "Nova categoria" : "Editar categoria",
    });
  }, [isNewCategory, isFocused]);

  useEffect(() => {
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

  const onSubmit = (category: CategoryRequest) => {
    if (isNewCategory) dispatch(createRequestAction(category));
    else dispatch(updateRequestAction(category, categoryParam?.id || 0));
  };

  return (
    <DismissKeyboard>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Controller
          control={control}
          name="name"
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="Nome"
              icon="logo-dropbox"
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
        <TextError error={sendError?.errorMessage} />
        <Separator />
        <AppButton
          title={isNewCategory ? "Cadastrar" : "Salvar"}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </ScrollView>
    </DismissKeyboard>
  );
};

export default NewEditCategoryScreen;
