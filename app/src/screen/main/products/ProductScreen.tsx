import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../../../interface";
import { HeaderRight, ListEmpty } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../services/store/createStore";
import { loadRequestAction } from "../../../services/store/ducks/product/actions";

const ProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { data: products, loading, error } = useSelector(
    (state: StoreState) => state.product
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setRefreshing(loading);
  }, [loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={() => navigation.navigate("NewEditProduct")} />
      ),
    });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    getProducts();
  }, []);

  function getProducts() {
    dispatch(loadRequestAction());
  }

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.action}>
          <TextInput placeholder="Buscar produto" style={styles.textInput} />
        </View>
      </View>
    );
  };

  const renderItemList = ({ item, index }: ListRenderItemInfo<Product>) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      key={String(item.id)}
    >
      {/* <Image source={{ uri: item.image }} style={styles.cardImage} /> */}
      <View
        style={{
          marginLeft: 6,
          flex: 1,
        }}
      >
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>cod: {item.barCorde}</Text>
      </View>
      <View style={{ alignItems: "flex-end", marginRight: 20 }}>
        <Text style={styles.cardValue}>R${item.salePrice}</Text>
        <Text style={styles.cardDescription}>
          comprado por: R${item.costPrice}
        </Text>
      </View>
      <Ionicons
        name="md-arrow-forward"
        size={20}
        color="gray"
        style={{ color: "#05375a" }}
      />
    </TouchableOpacity>
  );

  // const renderListOfProduct = () => (
  //   <>{DATA_PRODUCTS.map((item, index) => renderItemList(item, index))}</>
  // );

  return (
    <>
      {renderHeader()}
      <View style={styles.conteiner}>
        {/* <Text style={styles.subTitle}>{DATA_PRODUCTS.length} Produtos</Text> */}
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 12,
          }}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={products || []}
          renderItem={renderItemList}
          ListEmptyComponent={<ListEmpty />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="carregando.."
            />
          }
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  separator: {
    marginVertical: 3,
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
    flex: 1,
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
    margin: 12,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#FFF",
    width: "90%",
    color: "#222",
    fontSize: 17,
    borderRadius: 10,
    padding: 8,
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
    backgroundColor: "#8DD6CA",
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    margin: 12,
    alignItems: "center",
  },
});

export default ProductScreen;
