import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PickerModal from "react-native-picker-modal-view";
import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
interface InputSelectProps {
  placeholder?: string;
  label: string;
  values: any;
  selectedItemId: number;
  errors?: string | Array<string>;
  onSelected: (selected: IModalListInDto) => IModalListInDto;
}

function InputSelect({
  values,
  label,
  selectedItemId = 0,
  placeholder = "Selecione um item",
  onSelected,
  errors,
}: InputSelectProps) {
  function onClosed(): void {
    console.log("close key pressed");
  }

  function onBackButtonPressed(): void {
    console.log("back key pressed");
  }

  function renderText(selected: IModalListInDto): string {
    const s = values?.find(
      (item: IModalListInDto) => item.Id === selectedItemId
    );
    return selected?.Name || s?.Name || placeholder;
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <PickerModal
        renderSelectView={(disabled, selected, showModal) => (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            style={styles.button}
            onPress={showModal}
          >
            <Text style={styles.placeholder}>{renderText(selected)}</Text>
            <Ionicons
              name="md-arrow-dropdown"
              size={24}
              color="gray"
              style={{ alignContent: "flex-start", marginHorizontal: 6 }}
            />
          </TouchableOpacity>
        )}
        onSelected={(s) => onSelected(s)}
        onClosed={() => onClosed()}
        onBackButtonPressed={() => onBackButtonPressed()}
        items={values}
        sortingLanguage={"tr"}
        showToTopButton={true}
        showAlphabeticalIndex={false}
        autoGenerateAlphabeticalIndex={true}
        selectPlaceholderText={"Escolha um..."}
        onEndReached={() => {}}
        searchPlaceholderText={"Buscar..."}
        requireSelection={false}
        autoSort={false}
      />
      {errors && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#d5d5d5",
    paddingVertical: 8,
    alignContent: "flex-end",
    flexDirection: "row",
  },
  label: {
    color: "gray",
    fontWeight: "bold",
  },
  placeholder: {
    flex: 1,
    textAlign: "center",
    color: "#05375a",
  },
  errorText: {
    color: "red",
  },
});

export default InputSelect;
