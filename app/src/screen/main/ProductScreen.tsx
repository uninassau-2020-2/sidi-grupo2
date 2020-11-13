import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { ProductType } from "../../interface";
import ProductData from "../../data/ProductData.json";

const DATA_PRODUCTS: Array<ProductType> = ProductData;

export default function ProductScreen() {
  const renderItemList = (item: ProductType, index: number) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View
        style={{
          marginLeft: 6,
          flex: 1,
        }}
      >
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>codigo: {item.codigo}</Text>
      </View>
      <View style={{ alignItems: "flex-end", marginRight: 20 }}>
        <Text style={styles.cardValue}>R${item.price}</Text>
        <Text style={styles.cardDescription}>
          comprado por: R${item.purchasePrice}
        </Text>
      </View>
      {/* <View style={styles.cardDetails}> */}
      <Ionicons
        name="md-arrow-forward"
        size={20}
        color="gray"
        style={{ color: "#05375a" }}
      />
      {/* </View> */}
    </View>
  );

  const renderListOfProduct = () => (
    <List.Section>
      {DATA_PRODUCTS.map((item, index) => renderItemList(item, index))}
    </List.Section>
  );

  return (
    <SafeAreaView>
      <Text style={styles.title}>Produtos</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonAddText}>Novo produto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <TextInput placeholder="Buscar protudos" style={styles.textInput} />
      </View>
      <View style={styles.conteiner}>
        <Text style={styles.subTitle}>{DATA_PRODUCTS.length} Produtos</Text>
        <ScrollView>{renderListOfProduct()}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 12,
    marginTop: 80,
    marginBottom: 10,
    fontSize: 28,
    color: "#5c657e",
    fontWeight: "bold",
    position: "absolute",
  },
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    margin: 12,
    alignItems: "center",
  },
  cardDetails: {
    backgroundColor: "#05375a",
    height: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignContent: "center",
  },
  cardImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  conteiner: {
    backgroundColor: "#fff",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardValue: {
    fontSize: 16,
    color: "#83d79a",
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#a2abbb",
    marginBottom: 15,
  },

  action: {
    flexDirection: "row",
    zIndex: 2,
    elevation: 2,
    margin: 12,
  },
  textInput: {
    flex: 1,
    height: 52,
    backgroundColor: "#eee",
    shadowColor: "#000",
    borderRadius: 10,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 12,
    marginRight: 12,
    alignItems: "center",
    color: "#D4D4D4",
    textAlign: "right",
  },
  buttons: {
    alignItems: "flex-end",
    marginRight: 12,
    marginTop: 35,
  },
  buttonAdd: {
    padding: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#05375a",
  },
  buttonAddText: {
    fontSize: 14,
    color: "#eee",
  },
});
