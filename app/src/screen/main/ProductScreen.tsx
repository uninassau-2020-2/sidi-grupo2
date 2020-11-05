import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListRenderItemInfo,
  TouchableOpacity,
} from "react-native";
import { FlatList, RectButton, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface IProduct {
  name: string;
  id: number;
  unitOfMeasurement: string;
  price: number;
}

const DATA_PRODUCT: Array<IProduct> = [
  {
    name: "Mel",
    id: 1,
    unitOfMeasurement: "litro",
    price: 2.4,
  },
];

export default function HomeScreen() {
  const renderItemList = ({ item, index }: ListRenderItemInfo<IProduct>) => (
    <TouchableOpacity style={styles.itemList}>
      <Text>{item.name}</Text>
      <Text>{item.unitOfMeasurement}</Text>
      <Text>R${item.price}</Text>
    </TouchableOpacity>
  );

  const renderListOfProduct = () => (
    <FlatList
      keyExtractor={(item, index) => String(index)}
      data={DATA_PRODUCT}
      renderItem={renderItemList}
    />
  );

  return (
    <SafeAreaView>
      <Text style={styles.title}>Produtos</Text>
      <ScrollView>{renderListOfProduct()}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 12,
    marginTop: 24,
    fontSize: 24,
    color: "#5c657e",
    fontWeight: "bold",
  },
  itemList: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#d5d5d5",
    padding: 6,
  },
});
