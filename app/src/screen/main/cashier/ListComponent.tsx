import React, { useContext, useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  TextInput,
  Alert,
} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";
import InputSpinner from "react-native-input-spinner";
import { Modalize } from "react-native-modalize";
import { Product, SaleRequest } from "../../../interface";
import { AppContext } from "../../../context/shoppingCart.context";
import { ShoppingCartType, Types } from "../../../reducer/shoppingCart.reducer";
import { AppButton, Input, ListEmpty } from "../../../components";
import { loadRequestAction } from "../../../services/store/ducks/product/actions";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../services/store/createStore";
import { FormOfPayment } from "../../../enum";
import { doCreateSale } from "../../../services/sale";

const INIT_SALE = {
  formOfPayment: FormOfPayment.CREDIT_CARD,
  total: "0.0",
  change: "0.0",
  products: [],
};
const ListComponent: React.FC = () => {
  const { state: stateProduct, dispatch } = useContext(AppContext);
  const [products, setProduct] = useState<Product | undefined>();
  const [sale, setSale] = useState<SaleRequest>(INIT_SALE);
  const [change, setChange] = useState(0.0);
  const [changeError, setChangeError] = useState<string | null>(null);

  const modalizeRef = useRef<Modalize>(null);

  const dispatchApi = useDispatch();
  const { data: productsData, loading, error } = useSelector(
    (state: StoreState) => state.product
  );

  useEffect(() => {
    if (productsData.length === 0) getProducts();
    setSale({
      ...sale,
    } as SaleRequest);
  }, []);

  useEffect(() => {
    if (sale.formOfPayment === FormOfPayment.CREDIT_CARD) {
      setChangeError(null);
      setChange(0);
    }
  }, [sale]);

  useEffect(() => {
    let totalx = 0;
    stateProduct.products.map((item) => {
      totalx += Number(item.product.salePrice) * item.amount;
    });
    setSale({ ...sale, total: String(totalx) } as SaleRequest);
  }, [stateProduct]);

  const onOpen = () => {
    setSale({
      ...sale,
      products: stateProduct.products.map((item) => {
        return { amount: item.amount, productId: item.product.id };
      }),
    });
    modalizeRef.current?.open();
  };

  function getProducts() {
    dispatchApi(loadRequestAction());
  }

  const renderFooter = () => (
    <View
      style={{
        ...styles.cardSearch,
        height: 100,
        alignContent: "space-between",
      }}
    >
      <View>
        <Text style={styles.footerTitle}>Total:</Text>
        <Text style={{ color: "#83d79a", fontSize: 24, fontWeight: "bold" }}>
          R${sale?.total || "--"}
        </Text>
      </View>
      <AppButton
        // style={styles.buttonFinishShop}
        // activeOpacity={0.7}
        disabled={stateProduct.products.length === 0}
        width="auto"
        buttonStyle={{ paddingVertical: 8 }}
        onPress={onOpen}
        title="Finalizar compra"
      />
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
              if (text) {
                const product = productsData.find(
                  (product) =>
                    String(product.barCode).includes(text, 1) ||
                    product.name.includes(text)
                );
                setProduct(product);
              } else setProduct(undefined);
            }}
          />
        </View>
        {products && (
          <View style={styles.cardSearch}>
            <Text style={styles.cardTitle}>{products?.name}</Text>
            <Text style={styles.cardDescription}>{products?.barCode}</Text>

            <TouchableOpacity
              style={styles.buttonAdd}
              activeOpacity={0.7}
              onPress={() => {
                const equal = stateProduct.products.find(
                  (item) => item.product.id === products?.id
                );
                if (!equal) products && handlerAddProduct(products);
                else Alert.alert("Produto já adicionado");
              }}
            >
              <Text style={styles.buttonFinishShopText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  function handlerAddProduct(product: Product) {
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
        <Text>{product.salePrice}</Text>
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text style={styles.cardDescription}>{product.barCode}</Text>
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

  function renderCashAndChange() {
    return (
      <View
        style={{
          margin: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Input
            label={"Dinheiro"}
            placeholder={"Dinheiro"}
            onChangeText={(cash) => {
              const changex = Number(cash) - Number(sale.total);
              if (Number(cash) < Number(sale.total)) {
                setChange(0);
                setChangeError("Não pode ser menor que o total");
              } else {
                setChangeError(null);
                setChange(changex);
              }
            }}
            icon="md-cash"
            errors={changeError}
          />
        </View>
        <View style={{ width: "30%", marginHorizontal: 6 }}>
          <Text style={styles.cardDescription}>Troco</Text>
          <Text style={styles.cardTitle}>{`R$${change}`}</Text>
        </View>
      </View>
    );
  }

  function finished() {
    try {
      const response = doCreateSale(sale);
      modalizeRef.current?.close();
      Alert.alert("Compra feita com sucesso");
      setSale(INIT_SALE);
      setChange(0);
      setChangeError(null);
      dispatch({ type: Types.Clean, payload: {} });
    } catch (err) {
      console.log("err");
    }
  }

  return (
    <>
      {renderHeader()}
      <View style={styles.containerList}>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 6,
            marginTop: 12,
          }}
          data={stateProduct.products || []}
          style={{ padding: 12 }}
          keyExtractor={(item) => String(item.product.id) || "1"}
          renderItem={renderItemProduct}
          ListEmptyComponent={<ListEmpty text="Carrinho vazio" />}
        />
      </View>
      {renderFooter()}
      <Modalize
        ref={modalizeRef}
        snapPoint={420}
        // adjustToContentHeight
        panGestureComponentEnabled
        panGestureEnabled={false}
        onClose={() => {
          setChange(0);
          setChangeError(null);
          setSale({ ...sale, formOfPayment: INIT_SALE.formOfPayment });
        }}
      >
        <View style={styles.contentTitleModal}>
          <Text style={{ fontWeight: "bold", color: "#6a748d", fontSize: 18 }}>
            Finalizar Compra
          </Text>
        </View>
        <View style={styles.contentModal}>
          <View style={styles.contentCardModal}>
            <Text style={styles.titleCardModal}>Forma de pagamento</Text>
            <SegmentedControl
              values={["Cartão de Crédito", "Dinheiro"]}
              selectedIndex={Object.values(FormOfPayment).indexOf(
                sale?.formOfPayment
              )}
              onChange={(event) => {
                const form = Object.values(FormOfPayment)[
                  event.nativeEvent.selectedSegmentIndex
                ];
                if (form === FormOfPayment.CREDIT_CARD) {
                  setSale({ ...sale, change: "0" });
                } else {
                  setChangeError("campo obrigatório");
                }
                setSale({ ...sale, formOfPayment: form as FormOfPayment });
              }}
            />
            {/* 
            <View style={styles.CardModal}>
              <Text style={styles.titleCardModal}>Cartão</Text>
            </View>
            <View style={stzyles.CardModal}>
              <Text style={styles.titleCardModal}>Dinheiro</Text>
            </View> */}
          </View>

          {sale.formOfPayment === FormOfPayment.CASH && renderCashAndChange()}
          <View>
            <View style={styles.CardSalesModal}>
              <Text style={styles.cardDescription}>Total</Text>
              <Text style={styles.cardTitle}>R${sale.total}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.button}>
              <AppButton
                title="Finalizar"
                disabled={changeError !== null}
                onPress={() => finished()}
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
  // footer: {
  //   borderTopWidth: 1,
  //   borderColor: "#d5d5d5",
  //   paddingVertical: 20,
  //   backgroundColor: "#E1FBFC",
  // },
  footerTitle: {
    // fontWeight: "bold",
    fontSize: 12,
    color: "#6a748d",
    // margin: 12,
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
  contentTitleModal: {
    backgroundColor: "#eef4fc",
    paddingVertical: 12,
    alignItems: "center",
  },
  contentModal: {
    marginTop: 8,
    flex: 1,
  },
  contentCardModal: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    justifyContent: "space-between",
  },
  CardModal: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  CardSalesModal: {
    backgroundColor: "#eef4fc",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 6,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleCardModal: {
    color: "#6a748d",
    fontWeight: "bold",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 12,
  },
  footer: {
    flex: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: 30,
  },
});

export default ListComponent;
