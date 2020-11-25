import React, { createRef, useRef } from "react";

import { View, Text, StyleSheet, Button } from "react-native";
// import { ModalSelectList } from "react-native-modal-select-list";

interface InputSelectProps<S> {
  values: Array<S>;
}

export default function InputSelect<T>({}: InputSelectProps<T>) {
  // const saveModalRef = useRef(null);
  let modalRef: any;
  const onSelectedOption = (value: String) => {
    console.log(`You selected: ${value}`);
  };
  const openModal = () => modalRef.show();
  const saveModalRef = (ref: any) => (modalRef = ref);

  function staticModalOptions() {
    console.log("oooii");
  }
  return (
    <View style={styles.container}>
      {/* <Button title="Open Modal" onPress={openModal} /> */}
      <Text style={styles.title}>InputSelect</Text>
      {/* <ModalSelectList
        ref={saveModalRef}
        placeholder={"Buscar..."}
        closeButtonText={"Sair"}
        options={staticModalOptions}
        onSelectedOption={onSelectedOption}
        disableTextSearch={false}
        // provider={modalOptionsProvider}
        numberOfLines={3}
      /> */}
    </View>
  );
}

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
});
