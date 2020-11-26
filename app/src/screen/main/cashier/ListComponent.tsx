import React, { useRef, useState } from "react";

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
import { AppContext } from "../../../context/shoppingCart.context";
import { ShoppingCartType, Types } from "../../../reducer/shoppingCart.reducer";
import { Modalize } from 'react-native-modalize';
import { AppButton } from "../../../components";

const DATA_PRODUCTS: Array<ProductType> = ProductData;

const ListComponent: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const [products, setProduct] = useState<ProductType | undefined>();

  function calcTotal() {
    let totalx = 0;
    state.products.map((item) => {
      totalx += item.product.price * item.amount;
    });
    return totalx;
  }

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  function handleToNavigateToHome() {
  }

  const renderFooter = () => (
    <View style={styles.cardSearch}>
      <Text style={styles.footerTitle}>Total:</Text>
      <Text style={{ color: "#83d79a" }}>R${calcTotal()}</Text>
      <TouchableOpacity style={styles.buttonFinishShop} onPress={onOpen}>
        <Text style={styles.buttonFinishShopText}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.action}>
          <TextInput
            placeholder="Buscar produto"
            style={styles.inputSearch}
            onChangeText={(text) => {
              setProduct(
                DATA_PRODUCTS.find((product) => String(product.codigo) === text)
              );
            }}
          />
        </View>

        <View style={styles.cardSearch}>
          <Text style={styles.cardTitle}>{products?.name}</Text>
          <Text style={styles.cardDescription}>{products?.codigo}</Text>

          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => {
              products && handlerAddProduct(products);
            }}
          >
            <Text style={styles.buttonFinishShopText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
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
            height={30}
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
      <Modalize 
      ref={modalizeRef}
      snapPoint={420}
      >
          <View style={styles.contentTitleModal}>
            <Text style={{fontWeight: "bold", color: "#6a748d", fontSize:18}}>Finalizar Compra</Text>
          </View>
        <View style={styles.contentModal}>
          <View style={styles.contentCardModal}>
            <Text style={styles.titleCardModal}>Forma de pagamento</Text>

            <View style={styles.CardModal}>
              <Text style={styles.titleCardModal}>Cartão</Text>
            </View>
            <View style={styles.CardModal}>
              <Text style={styles.titleCardModal}>Dinheiro</Text>
            </View>
          </View>

          <View >
            <View style={styles.CardSalesModal}>
              <Text style={styles.cardDescription}>SubTotal</Text>
              <Text style={styles.cardDescription}>Desconto</Text>
              <Text style={styles.cardDescription}>Troco</Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.cardTitle}>R$ 100</Text>
                  <Text style={styles.cardTitle}>R$ 100</Text>
                  <Text style={styles.cardTitle}>R$ 100</Text>
                </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.button}>
            <AppButton
              title="Finalizar"
              onPress={handleToNavigateToHome}
              />
            </View>
          </View>

        </View>
      </Modalize>
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
    backgroundColor: "#fff",
  },
  buttonFinishShop: {
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#05375a",
  },
  buttonAdd: {
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#05375a",
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
    paddingVertical: 20,
    backgroundColor: "#E1FBFC",
  },
  footerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6a748d",
    margin: 12,
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
  cardSearch: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 12,
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
  action: {
    zIndex: 2,
    elevation: 2,
    margin: 12,
    alignItems: "center",
  },
  contentTitleModal:{
    backgroundColor: "#eef4fc",
    paddingVertical: 12,
    alignItems: "center",
  },
  contentModal:{
    marginTop: 8,
    flex: 1
  },
  contentCardModal:
  {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    justifyContent: "space-between",
  },
  CardModal:{
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  CardSalesModal:{
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    justifyContent: "space-between",
    flexDirection: "row",

  },
  titleCardModal:
  {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  footer:{
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: 30,
  }
});

export default ListComponent;
