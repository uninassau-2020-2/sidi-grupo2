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
import { List } from "react-native-paper";
import { Card, Title, Paragraph } from "react-native-paper";
import { IProduct } from "../../interface";

const DATA_PRODUCT: Array<IProduct> = [
  {
    name: "Mel",
    id: 1,
    unitOfMeasurement: "litro",
    price: 2.4,
    codigo: 48755961528,
  },
  {
    name: "Creme",
    id: 2,
    unitOfMeasurement: "unidade",
    price: 1.4,
    codigo: 48755961528,
  },
];

export default function HomeScreen() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const renderItemList = (item: IProduct, index: number) => (
    <TouchableOpacity>
      <List.Accordion title={item.name} description={item.codigo}>
        <Card>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>{item.unitOfMeasurement}</Paragraph>
            <Paragraph>R${item.price}</Paragraph>
          </Card.Content>
        </Card>
      </List.Accordion>
    </TouchableOpacity>
  );

  const renderListOfProduct = () => (
    <List.Section title="Accordions">
      {DATA_PRODUCT.map((item, index) => renderItemList(item, index))}
    </List.Section>
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
