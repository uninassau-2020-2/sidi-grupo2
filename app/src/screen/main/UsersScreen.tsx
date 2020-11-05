import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListRenderItemInfo,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlatList, RectButton, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataTable } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';


interface IUsers {
  name: string;
  id: number;
  acessNivel: string;
}

const DATA_PRODUCT: Array<IUsers> = [
  {
    name: "fellip",
    id: 1,
    acessNivel: "admin",
  },
  {
    name: "Mario",
    id: 2,
    acessNivel: "vendedor",
  },
  {
    name: "Daniel",
    id: 3,
    acessNivel: "admin",
  },
  {
    name: "Leticia",
    id: 4,
    acessNivel: "fornecedor",
  },
  {
    name: "João",
    id: 5,
    acessNivel: "admin",
  },
  {
    name: "Lais",
    id: 6,
    acessNivel: "Vendedor",
  },
  
];

export default function UsersScreen() {

  const renderItemList = ({ item, index }: ListRenderItemInfo<IUsers>) => (

    <TouchableOpacity>
      <DataTable>
      <DataTable.Row>
      
          <DataTable.Cell>
          <Image
            source={{
             uri: `https://ui-avatars.com/api/?name=${item.name}`,
          }}
            style={styles.cardImage}
          />
          </DataTable.Cell>
          <DataTable.Cell >{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.acessNivel}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
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
      <Text style={styles.title}>Usuarios</Text>
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title >Nome</DataTable.Title>
          <DataTable.Title numeric>Cargo</DataTable.Title>
        </DataTable.Header>
        </DataTable>
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
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 12,
  },
  itemList: {
    justifyContent: "space-between",
    height: 40,
    flexDirection: "row",
    padding: 6,
    backgroundColor: "#c1c4cb",

  },
  textList: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 6,
    margin: 12,

  },
  cardImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    resizeMode: "stretch",
    marginTop: 10,
    marginRight: 5,
  },
});
