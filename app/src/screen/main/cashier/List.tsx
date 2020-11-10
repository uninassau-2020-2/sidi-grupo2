import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  TextInput,
} from "react-native";
import InputSpinner from "react-native-input-spinner";
import { ProductType } from "../../../interface";
import ProductData from "../../../data/ProductData.json";
import { AppContext } from "../../../context/ShoppingCartContext";
import { ShoppingCartType, Types } from "../../../reducer/ShoppingCartReducer";

const DATA_PRODUCTS: Array<ProductType> = ProductData;

const List: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [products, setProduct] = useState<ProductType | undefined>();

  function calcTotal() {
    let totalx = 0;
    state.products.map((item) => {
      totalx += item.product.price * item.amount;
    });
    return totalx;
  }

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text>Total</Text>
      <Text>R${calcTotal()}</Text>
      <TouchableOpacity style={styles.buttonFinishShop}>
        <Text>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => {
    return (
      <View>
        <Text>Realizar busca</Text>
        <TextInput
          placeholder="Faça a busca"
          style={styles.inputSearch}
          onChangeText={(text) => {
            setProduct(
              DATA_PRODUCTS.find((product) => String(product.codigo) === text)
            );
          }}
        />
        <Text>{products?.name}</Text>
        <Text>{products?.codigo}</Text>
        <TouchableOpacity
          onPress={() => {
            products && handlerAddProduct(products);
          }}
        >
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function handlerAddProduct(product: ProductType) {
    dispatch({
      type: Types.Create,
      payload: {
        product: product,
        amount: 1,
      },
    });
  }

  const renderItemProduct = ({
    item,
    index,
  }: ListRenderItemInfo<ShoppingCartType>) => {
    const { product } = item;
    return (
      <TouchableOpacity
        style={styles.card}
        onLongPress={() => {
          dispatch({
            type: Types.Delete,
            payload: {
              id: product.id,
            },
          });
        }}
      >
        <Text>{product.price}</Text>
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text style={styles.cardDescription}>{product.codigo}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <InputSpinner
            max={product.amount}
            min={1}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#d3d3d3"}
            value={1}
            rounded={false}
            showBorder
            height={35}
            width={120}
            onChange={(num: number) => {
              dispatch({
                type: Types.Edit,
                payload: {
                  id: product.id,
                  amount: num,
                },
              });
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {renderHeader()}
      <View style={styles.containerList}>
        <FlatList
          data={state.products}
          style={{ padding: 12 }}
          keyExtractor={(item) => String(item.product.id)}
          renderItem={renderItemProduct}
        />
      </View>
      {renderFooter()}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
  containerList: {
    flex: 1,
  },
  buttonFinishShop: {
    // flex: 1,
  },
  inputSearch: {
    backgroundColor: "#FFF",
    width: "90%",
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 8,
  },
  buttonFinishShopText: {
    color: "#fff",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#d5d5d5",
  },

  card: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "stretch",
  },
  cardTitle: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardDescription: {
    color: "#a2abbb",
  },
  cardValue: {
    fontSize: 16,
    color: "#83d79a",
    fontWeight: "bold",
  },
});

export default List;
