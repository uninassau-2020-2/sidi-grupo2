import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListRenderItemInfo,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";

import { FlatList, RectButton, ScrollView,} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "react-native-paper";
import { Card, Title, Paragraph,  } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { ProductType } from "../../interface";
import ProductData from "../../data/ProductData.json";

interface IProduct {
  name: string;
  id: number;
  unitOfMeasurement: string;
  price: number;
  codigo: number;
}

const DATA_PRODUCTS: Array<ProductType> = ProductData;


export default function HomeScreen() {

  const renderItemList = (item: IProduct, index: number) => (
    <View>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://veja.abril.com.br/wp-content/uploads/2020/08/2-GettyImages-1128182316.jpg.jpg?quality=70&strip=info&resize=100,100",
          }}
          style={styles.cardImage}
        />
        <View style={{ marginLeft: 6, flex: 1, marginTop: -95 }}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDescription}>codigo: {item.codigo}</Text>
          <View style={{height:1, backgroundColor: "#d4d4d4", marginBottom: 10, width: 280}}></View>
            <Text style={{color: "#a2abbb", marginTop: 4}}>Valor de compra: 10</Text>
            <Text style={{color: "#a2abbb", marginTop: 4}}>Valor de compra: 10</Text>
            <Text style={{color: "#a2abbb", marginTop: 4}}>Valor de compra: 10</Text>
        </View>
        <View style={{ alignItems: "flex-end", marginTop: -95  }}>
          <Text style={styles.cardValue}>R${item.price}</Text>
          <Text style={styles.cardDescription}>Total: R$10.5</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <Text style={{color: "#fff", marginLeft: 10, marginTop: 10}}>Detalhes</Text>
        <Ionicons name="md-arrow-forward" size={20} color="gray" 
        style={{color: "#fff", marginLeft: 240, marginTop: 10}}/>
      </View>
    </View>
    
  );
  

  const renderListOfProduct = () => (
    <List.Section >
      {DATA_PRODUCTS.map((item, index) => renderItemList(item, index))}
    </List.Section>
  );

  return (
    <SafeAreaView>
      <Text style={styles.title}>Produtos</Text>
      <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            //onPress={handleToNavigateToSignIn}
          >
            <Text style={styles.textSign}>Novo produto</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.action}>
          <TextInput
            placeholder="Buscar protudos"
            style={styles.textInput}
            keyboardType="email-address"
          />
      </View>
      <View style={styles.conteiner}>
      <View  style={styles.subTitle}>
        <Text style={{color: "#D4D4D4"}}>10 Produtos</Text>
      </View>
      <ScrollView>{renderListOfProduct()}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  title: {
    margin: 12,
    marginTop: 80,
    marginBottom:10,
    fontSize: 28,
    color: "#5c657e",
    fontWeight: "bold",
    position: "absolute",

  },
  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginVertical: 6,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    margin: 12,
    height: 200,
  },
  cardDetails:{
    backgroundColor: "#05375a",
    height: 40,
    flexDirection: "row",
    margin: 12,
    marginTop: -45,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  cardImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    resizeMode: "stretch",
    marginTop: -150
  },
  conteiner:{
    backgroundColor: "#fff",
    marginTop: 140,
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 55
  },
  cardValue: {
    fontSize: 16,
    color: "#83d79a",
    fontWeight: "bold",
    marginTop: -30

  },
  cardDescription: {
    color: "#a2abbb",
    marginBottom: 15,
  },

  action: {
    flexDirection: "row",
    marginTop: 140, 
    zIndex: 2,
    elevation: 2,
    position: "absolute",
    margin: 12
  },
  textInput: {
    flex: 1,
    height: 52,
    backgroundColor: "#eee",
    shadowColor: "#000",
    borderRadius: 10,
  },
  subTitle:{
    fontSize: 16,
    marginTop: 40,
    alignItems: "center",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 85,
    marginLeft: 240,
    position: "absolute"
  },
  signIn: {
    width: 90,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:20,
    backgroundColor: "#05375a"
  },
  textSign: {
    fontSize: 12,
    color: "#eee",
  },
});
